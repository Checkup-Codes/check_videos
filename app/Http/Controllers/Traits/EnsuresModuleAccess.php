<?php

namespace App\Http\Controllers\Traits;

use App\Services\GuestVisibilityService;
use Illuminate\Support\Facades\Auth;

trait EnsuresModuleAccess
{
    protected function ensureModuleAccess(string $module): void
    {
        $service = app(GuestVisibilityService::class);

        if ($service->canAccess($module)) {
            return;
        }

        if (Auth::check()) {
            abort(403);
        }

        redirect()->route('login')->send();
    }
}
