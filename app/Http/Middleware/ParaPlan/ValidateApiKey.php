<?php

namespace App\Http\Middleware\ParaPlan;

use Closure;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class ValidateApiKey
{
    /**
     * Handle an incoming request.
     *
     * @param Request $request
     * @param Closure $next
     * @return Response
     */
    public function handle(Request $request, Closure $next): Response
    {
        $apiKey = $request->header('X-ParaPlan-API-Key');
        $expectedKey = env('PARAPLAN_API_KEY');

        // Check if API key is provided
        if (!$apiKey) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized. API key is required.',
            ], 401);
        }

        // Check if API key matches
        if ($apiKey !== $expectedKey || empty($expectedKey)) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized. Invalid API key.',
            ], 401);
        }

        return $next($request);
    }
}
