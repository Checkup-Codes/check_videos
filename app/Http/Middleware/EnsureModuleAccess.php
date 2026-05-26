<?php

namespace App\Http\Middleware;

use App\Services\GuestVisibilityService;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureModuleAccess
{
    public function __construct(
        private readonly GuestVisibilityService $guestVisibility
    ) {}

    public function handle(Request $request, Closure $next, string $module): Response
    {
        if (!$this->guestVisibility->canAccess($module)) {
            if ($request->user()) {
                abort(403);
            }

            return redirect()->route('login');
        }

        return $next($request);
    }
}
