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
            'message' => ['required', 'string', 'max:100'],
            'language' => ['required', 'string', 'in:tr,en'],
            'timestamp' => ['nullable', 'date'],
            'platform' => ['required', 'string', 'in:ios,android'],
        ]);

        if ($validator->fails()) {
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

            // Parse and validate timestamp
            $submittedAt = null;
            if ($request->has('timestamp')) {
                try {
                    $submittedAt = \Carbon\Carbon::parse($request->input('timestamp'));
                } catch (\Exception $e) {
                    // If timestamp parsing fails, use current time
                    $submittedAt = now();
                }
            }

            // Create feedback submission
            $feedback = FeedbackSubmission::create([
                'email' => $request->input('email'),
                'message' => trim($request->input('message')),
                'language' => $request->input('language'),
                'platform' => $request->input('platform'),
                'status' => 'pending', // Default status
                'ip_address' => $ipAddress,
                'user_agent' => $userAgent,
                'submitted_at' => $submittedAt ?? now(),
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
            Log::error('Error storing feedback', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
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
                ->select('id', 'email', 'message', 'language', 'platform', 'status', 'submitted_at')
                ->get();

            // Map to the required format
            $data = $feedbacks->map(function ($feedback) {
                return [
                    'id' => $feedback->id,
                    'email' => $feedback->email,
                    'message' => $feedback->message,
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
            Log::error('Error fetching feedback statuses', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);

            return response()->json([
                'success' => false,
                'message' => 'An error occurred while fetching feedback statuses',
            ], 500);
        }
    }
}
