<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Auth;
use App\Models\WritesCategories\Write;

class CheckWriteAccess
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Eğer URL'de slug parametresi varsa yazı erişimini kontrol et
        if ($request->route('write')) {
            $slug = $request->route('write');

            // Admin değilse ve yazı private ise 404 hatası ver
            if (!Auth::check()) {
                $write = Write::where('slug', $slug)->first();

                // If write is link_only, allow access
                if ($write && $write->status === Write::STATUS_LINK_ONLY) {
                    return $next($request);
                }

                // If write is private, deny access
                if ($write && $write->status === Write::STATUS_PRIVATE) {
                    abort(404); // Sayfa bulunamadı hatası ver
                }
            }
        }

        return $next($request);
    }
}
