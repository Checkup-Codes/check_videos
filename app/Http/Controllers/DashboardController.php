<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\WritesCategories\Write;
use App\Models\WritesCategories\Category;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class DashboardController extends Controller
{
    public function index()
    {
        $user = Auth::user();

        // User's writes count
        $writes_count = Write::where('author_id', $user->id)->count();
        $public_writes_count = Write::where('author_id', $user->id)->where('status', 'public')->count();
        $private_writes_count = Write::where('author_id', $user->id)->where('status', 'private')->count();

        // Get categories that have writes by this user
        $user_categories_ids = DB::table('content_category_write')
            ->join('content_writes', 'content_category_write.write_id', '=', 'content_writes.id')
            ->where('content_writes.author_id', $user->id)
            ->pluck('content_category_write.category_id')
            ->unique();

        $categories_count = count($user_categories_ids);

        // User's content statistics
        $stats = [
            'categories_count' => $categories_count,
            'writes_count' => $writes_count,
            'public_writes_count' => $public_writes_count,
            'private_writes_count' => $private_writes_count,
        ];

        // Recent writes
        $recentWrites = Write::where('author_id', $user->id)
            ->orderBy('updated_at', 'desc')
            ->take(5)
            ->get();

        // Popular categories (based on number of writes by this user)
        $popularCategories = Category::whereIn('id', $user_categories_ids)
            ->withCount(['writes' => function ($query) use ($user) {
                $query->where('author_id', $user->id);
            }])
            ->orderBy('writes_count', 'desc')
            ->take(5)
            ->get();

        // Monthly writes statistics
        $monthlyStats = Write::where('author_id', $user->id)
            ->whereYear('created_at', date('Y'))
            ->select(DB::raw('MONTH(created_at) as month'), DB::raw('COUNT(*) as count'))
            ->groupBy('month')
            ->orderBy('month')
            ->get()
            ->keyBy('month')
            ->map(function ($item) {
                return $item->count;
            })
            ->toArray();

        // Fill in missing months with zero counts
        for ($i = 1; $i <= 12; $i++) {
            if (!isset($monthlyStats[$i])) {
                $monthlyStats[$i] = 0;
            }
        }
        ksort($monthlyStats);

        // Tüm yazıları getir
        $allWrites = Write::select('id', 'title')
            ->orderBy('title')
            ->get();

        return Inertia::render('Dashboard', [
            'stats' => $stats,
            'recentWrites' => $recentWrites,
            'popularCategories' => $popularCategories,
            'monthlyStats' => $monthlyStats,
            'allWrites' => $allWrites,
        ]);
    }
}
