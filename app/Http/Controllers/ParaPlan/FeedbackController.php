<?php

namespace App\Http\Controllers\ParaPlan;

use App\Http\Controllers\Controller;
use App\Models\ParaPlan\FeedbackSubmission;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;

class FeedbackController extends Controller
{
    /**
     * Store a new feedback submission.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function store(Request $request): JsonResponse
    {
        // Validate the request
        $validator = Validator::make($request->all(), [
            'email' => ['nullable', 'email', 'max:60'],
            'message' => ['required', 'string', 'max:500'], // 100'den 500'e çıkarıldı
            'language' => ['required', 'string', 'in:tr,en'],
            'timestamp' => ['nullable', 'date'],
            'platform' => ['required', 'string', 'in:ios,android'],
        ]);

        if ($validator->fails()) {
            // Log validation errors for debugging
            Log::warning('Feedback validation failed', [
                'errors' => $validator->errors()->toArray(),
                'request_data' => $request->except(['message']), // Exclude message for privacy
                'ip_address' => $request->ip(),
                'user_agent' => $request->userAgent(),
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors(),
            ], 422);
        }

        try {
            // Get client IP and User Agent
            $ipAddress = $request->ip();
            $userAgent = $request->userAgent();

            // Always use server timestamp for consistency and security
            // Frontend timestamp is ignored - backend creates its own timestamp
            $submittedAt = now();

            // Create feedback submission
            $feedback = FeedbackSubmission::create([
                'email' => $request->input('email'),
                'message' => trim($request->input('message')),
                'language' => $request->input('language'),
                'platform' => $request->input('platform'),
                'status' => 'pending', // Default status
                'ip_address' => $ipAddress,
                'user_agent' => $userAgent,
                'submitted_at' => $submittedAt,
            ]);

            // Log the feedback
            Log::info('Feedback submitted', [
                'id' => $feedback->id,
                'email' => $feedback->email,
                'platform' => $feedback->platform,
                'language' => $feedback->language,
                'ip_address' => $ipAddress,
            ]);

            // Send email notification to admin (optional)
            $this->sendAdminNotification($feedback);

            return response()->json([
                'success' => true,
                'id' => $feedback->id, // Return ID for status tracking
                'message' => 'Feedback başarıyla kaydedildi',
            ], 201);
        } catch (\Exception $e) {
            // Detailed error logging
            Log::error('Error storing feedback', [
                'error' => $e->getMessage(),
                'error_code' => $e->getCode(),
                'file' => $e->getFile(),
                'line' => $e->getLine(),
                'trace' => $e->getTraceAsString(),
                'request_data' => $request->except(['message']), // Exclude message for privacy
                'ip_address' => $request->ip(),
                'user_agent' => $request->userAgent(),
            ]);

            return response()->json([
                'success' => false,
                'message' => 'An error occurred while submitting feedback',
            ], 500);
        }
    }

    /**
     * Send email notification to admin about new feedback.
     *
     * @param FeedbackSubmission $feedback
     * @return void
     */
    private function sendAdminNotification(FeedbackSubmission $feedback): void
    {
        try {
            $adminEmail = config('mail.from.address');

            if (!$adminEmail) {
                return;
            }

            Mail::raw(
                "New feedback received:\n\n" .
                    "Email: " . ($feedback->email ?? 'N/A') . "\n" .
                    "Message: " . $feedback->message . "\n" .
                    "Language: " . $feedback->language . "\n" .
                    "Platform: " . $feedback->platform . "\n" .
                    "Submitted at: " . $feedback->submitted_at?->format('Y-m-d H:i:s') . "\n" .
                    "IP Address: " . ($feedback->ip_address ?? 'N/A') . "\n",
                function ($message) use ($adminEmail, $feedback) {
                    $message->to($adminEmail)
                        ->subject('New Feedback Submission - ' . $feedback->platform);
                }
            );
        } catch (\Exception $e) {
            // Log email error but don't fail the request
            Log::warning('Failed to send feedback notification email', [
                'error' => $e->getMessage(),
                'feedback_id' => $feedback->id,
            ]);
        }
    }

    /**
     * Get status for multiple feedback requests.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function getRequestsStatus(Request $request): JsonResponse
    {
        // Validate the request
        $validator = Validator::make($request->all(), [
            'ids' => ['required', 'array'],
            'ids.*' => ['integer', 'min:1'],
        ]);

        if ($validator->fails()) {
            // Log validation errors for debugging
            Log::warning('Feedback status request validation failed', [
                'errors' => $validator->errors()->toArray(),
                'request_data' => $request->all(),
                'ip_address' => $request->ip(),
                'user_agent' => $request->userAgent(),
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors(),
            ], 422);
        }

        try {
            $ids = $request->input('ids');

            // Fetch all feedback data for the requested IDs
            $feedbacks = FeedbackSubmission::whereIn('id', $ids)
                ->select('id', 'email', 'message', 'admin_message', 'language', 'platform', 'status', 'submitted_at')
                ->get();

            // Map to the required format
            $data = $feedbacks->map(function ($feedback) {
                return [
                    'id' => $feedback->id,
                    'email' => $feedback->email,
                    'message' => $feedback->message,
                    'admin_message' => $feedback->admin_message, // Admin mesajı
                    'timestamp' => $feedback->submitted_at ? $feedback->submitted_at->toIso8601String() : null,
                    'language' => $feedback->language,
                    'platform' => $feedback->platform,
                    'status' => $feedback->status ?? 'pending',
                ];
            });

            return response()->json([
                'data' => $data,
            ], 200);
        } catch (\Exception $e) {
            // Detailed error logging
            Log::error('Error fetching feedback statuses', [
                'error' => $e->getMessage(),
                'error_code' => $e->getCode(),
                'file' => $e->getFile(),
                'line' => $e->getLine(),
                'trace' => $e->getTraceAsString(),
                'request_data' => $request->all(),
                'ip_address' => $request->ip(),
                'user_agent' => $request->userAgent(),
            ]);

            return response()->json([
                'success' => false,
                'message' => 'An error occurred while fetching feedback statuses',
            ], 500);
        }
    }

    /**
     * Update admin message for a feedback submission.
     * Admin can add/update a response message to user feedback.
     *
     * @param Request $request
     * @param int $id
     * @return JsonResponse
     */
    public function updateAdminMessage(Request $request, int $id): JsonResponse
    {
        // Validate the request
        $validator = Validator::make($request->all(), [
            'admin_message' => ['nullable', 'string', 'max:2000'], // Admin mesajı daha uzun olabilir
        ]);

        if ($validator->fails()) {
            // Log validation errors for debugging
            Log::warning('Admin message update validation failed', [
                'errors' => $validator->errors()->toArray(),
                'feedback_id' => $id,
                'ip_address' => $request->ip(),
                'user_agent' => $request->userAgent(),
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors(),
            ], 422);
        }

        try {
            $feedback = FeedbackSubmission::findOrFail($id);

            $feedback->update([
                'admin_message' => $request->input('admin_message') ? trim($request->input('admin_message')) : null,
            ]);

            // Log the update
            Log::info('Admin message updated', [
                'feedback_id' => $feedback->id,
                'has_admin_message' => !empty($feedback->admin_message),
                'ip_address' => $request->ip(),
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Admin mesajı güncellendi',
                'data' => [
                    'id' => $feedback->id,
                    'admin_message' => $feedback->admin_message,
                ],
            ], 200);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            Log::warning('Feedback not found for admin message update', [
                'feedback_id' => $id,
                'ip_address' => $request->ip(),
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Feedback bulunamadı',
            ], 404);
        } catch (\Exception $e) {
            // Detailed error logging
            Log::error('Error updating admin message', [
                'error' => $e->getMessage(),
                'error_code' => $e->getCode(),
                'file' => $e->getFile(),
                'line' => $e->getLine(),
                'trace' => $e->getTraceAsString(),
                'feedback_id' => $id,
                'ip_address' => $request->ip(),
                'user_agent' => $request->userAgent(),
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Admin mesajı güncellenirken bir hata oluştu',
            ], 500);
        }
    }
}
