<?php

namespace App\Http\Controllers\WritesCategories;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;

class ImageUploadController extends Controller
{
    // Define threshold for slow operations in seconds
    private const SLOW_OPERATION_THRESHOLD = 0.5;

    /**
     * Format execution time with performance indicators
     * 
     * @param float $executionTime
     * @return array
     */
    private function formatExecutionTime($executionTime)
    {
        return [
            'value' => round($executionTime, 4) . ' seconds',
            'is_slow' => $executionTime > self::SLOW_OPERATION_THRESHOLD
        ];
    }

    /**
     * Upload image for Quill Editor
     * 
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function upload(Request $request)
    {
        $startTime = microtime(true);

        // Image file validation
        $request->validate([
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:10240', // 10MB limit
        ]);

        try {
            if ($request->hasFile('image')) {
                $image = $request->file('image');

                // Create unique filename
                $fileName = 'write_' . Str::uuid() . '.' . $image->getClientOriginalExtension();

                // Store the image
                $path = $image->storeAs('public/write_images', $fileName);

                // Generate URL
                $url = asset(Storage::url($path));

                $executionTime = microtime(true) - $startTime;
                $formattedTime = $this->formatExecutionTime($executionTime);

                Log::info('Image uploaded', [
                    'filename' => $fileName,
                    'size' => $image->getSize(),
                    'execution_time' => $formattedTime['value'],
                    'is_slow' => $formattedTime['is_slow']
                ]);

                // Successful response
                return response()->json([
                    'success' => true,
                    'url' => $url,
                    'performance' => [
                        'execution_time' => $formattedTime
                    ]
                ]);
            }

            $executionTime = microtime(true) - $startTime;
            $formattedTime = $this->formatExecutionTime($executionTime);

            Log::warning('Image upload failed - no file', [
                'execution_time' => $formattedTime['value'],
                'is_slow' => $formattedTime['is_slow']
            ]);

            return response()->json([
                'success' => false,
                'message' => 'An error occurred while uploading the image.',
                'performance' => [
                    'execution_time' => $formattedTime
                ]
            ], 400);
        } catch (\Exception $e) {
            $executionTime = microtime(true) - $startTime;
            $formattedTime = $this->formatExecutionTime($executionTime);

            Log::error('Image upload error', [
                'error' => $e->getMessage(),
                'execution_time' => $formattedTime['value'],
                'is_slow' => $formattedTime['is_slow']
            ]);

            return response()->json([
                'success' => false,
                'message' => 'An error occurred while uploading the image: ' . $e->getMessage(),
                'performance' => [
                    'execution_time' => $formattedTime
                ]
            ], 500);
        }
    }
}
