<?php

namespace App\Http\Controllers;

use App\Services\GuestVisibilityService;
use App\Support\TenantDomain;
use Illuminate\Http\Request;
use Inertia\Inertia;

class GuestVisibilityController extends Controller
{
    public function __construct(
        private readonly GuestVisibilityService $guestVisibility
    ) {}

    public function edit()
    {
        return Inertia::render('GuestVisibility/Edit', [
            'modules' => $this->guestVisibility->moduleDefinitions(),
            'settings' => $this->guestVisibility->forFrontend(),
            'currentDomain' => TenantDomain::current(),
            'hiddenFeatures' => TenantDomain::hiddenFeatures(TenantDomain::current()),
        ]);
    }

    public function update(Request $request)
    {
        $validated = $request->validate([
            'tests' => 'boolean',
            'words' => 'boolean',
            'services' => 'boolean',
            'projects' => 'boolean',
            'certificates' => 'boolean',
            'bookmarks' => 'boolean',
            'workspace' => 'boolean',
        ]);

        $this->guestVisibility->update($validated);

        return back()->with('success', 'Ziyaretçi görünürlük ayarları kaydedildi.');
    }
}
