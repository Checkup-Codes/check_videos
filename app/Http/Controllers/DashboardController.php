<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\WritesCategories\Write;
use App\Models\WritesCategories\Category;
use App\Models\Journey;
use App\Models\Certificate;
use App\Models\Workspace;
use App\Models\Bookmark;
use App\Models\Tests\Test;
use App\Models\Rendition\Word;
use App\Models\Projects\Service;
use App\Models\FBVersions\Version;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class DashboardController extends Controller
{
    public function index()
    {
        $user = Auth::user();

        // Collect all module statistics
        $modules = [
            'writes' => [
                'count' => Write::where('author_id', $user->id)->count(),
                'recent' => Write::where('author_id', $user->id)
                    ->orderBy('updated_at', 'desc')
                    ->take(3)
                    ->get(['id', 'title', 'status', 'updated_at']),
                'icon' => 'pencil',
                'route' => 'writes.index',
                'color' => 'blue',
            ],
            'journeys' => [
                'count' => Journey::where('user_id', $user->id)->count(),
                'recent' => Journey::where('user_id', $user->id)
                    ->latest()
                    ->take(3)
                    ->get(['id', 'title', 'entry_date', 'status']),
                'icon' => 'map',
                'route' => 'journey.index',
                'color' => 'purple',
            ],
            'certificates' => [
                'count' => Certificate::count(),
                'recent' => Certificate::active()
                    ->ordered()
                    ->take(3)
                    ->get(['id', 'title', 'issuer', 'issue_date']),
                'icon' => 'award',
                'route' => 'certificates.index',
                'color' => 'green',
            ],
            'workspaces' => [
                'count' => Workspace::where('user_id', $user->id)->count(),
                'recent' => Workspace::where('user_id', $user->id)
                    ->orderBy('created_at', 'desc')
                    ->take(3)
                    ->get(['id', 'status', 'created_at']),
                'icon' => 'briefcase',
                'route' => 'workspace.index',
                'color' => 'orange',
            ],
            'bookmarks' => [
                'count' => Bookmark::where('user_id', $user->id)->count(),
                'recent' => Bookmark::where('user_id', $user->id)
                    ->orderBy('created_at', 'desc')
                    ->take(3)
                    ->get(['id', 'name', 'link', 'created_at']),
                'icon' => 'bookmark',
                'route' => 'bookmarks.index',
                'color' => 'yellow',
            ],
            'tests' => [
                'count' => Test::where('author_id', $user->id)->count(),
                'recent' => Test::where('author_id', $user->id)
                    ->orderBy('created_at', 'desc')
                    ->take(3)
                    ->get(['id', 'title', 'status', 'total_questions']),
                'icon' => 'clipboard',
                'route' => 'test-categories.index',
                'color' => 'red',
            ],
            'words' => [
                'count' => Word::count(),
                'recent' => Word::orderBy('created_at', 'desc')
                    ->take(3)
                    ->get(['id', 'word', 'language', 'is_complete']),
                'icon' => 'book',
                'route' => 'rendition.words.index',
                'color' => 'indigo',
            ],
            'services' => [
                'count' => Service::count(),
                'recent' => Service::orderBy('created_at', 'desc')
                    ->take(3)
                    ->get(['id', 'name', 'description']),
                'icon' => 'cog',
                'route' => 'services.index',
                'color' => 'gray',
            ],
            'versions' => [
                'count' => Version::count(),
                'recent' => Version::orderBy('created_at', 'desc')
                    ->take(3)
                    ->get(['id', 'version', 'release_date']),
                'icon' => 'code',
                'route' => 'versions.index',
                'color' => 'pink',
            ],
        ];

        return Inertia::render('Dashboard', [
            'modules' => $modules,
            'screen' => $this->getScreenData(false),
        ]);
    }

    /**
     * Get screen data for dashboard page
     * Uses SeoService for centralized data management
     * 
     * @param string|null $pageTitle
     * @param bool $isMobile
     * @return array
     */
    private function getScreenData(?string $pageTitle = null, bool $isMobile = false): array
    {
        return app(\App\Services\SeoService::class)->getScreenSeo(
            'dashboard',
            $pageTitle ?? 'Panel',
            null,
            $isMobile
        );
    }
}
