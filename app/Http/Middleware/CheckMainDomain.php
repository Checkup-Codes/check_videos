<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckMainDomain
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $mainDomain = config('domains.main_domain', 'checkupcodes.com');
        $currentHost = $request->getHost();
        
        // Remove www. prefix for comparison
        $currentHost = preg_replace('/^www\./', '', $currentHost);
        
        // Check if current domain is the main domain
        if ($currentHost !== $mainDomain) {
            // Redirect to 404 or show access denied
            abort(403, 'Bu sayfaya sadece ana domain üzerinden erişilebilir.');
        }

        return $next($request);
    }
}
