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
                $isPrivate = Write::where('slug', $slug)
                    ->where('status', 'private')
                    ->exists();

                if ($isPrivate) {
                    abort(404); // Sayfa bulunamadı hatası ver
                }
            }
        }

        return $next($request);
    }
}
