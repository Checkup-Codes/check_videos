<?php

namespace App\Http\Middleware;

use App\Support\TenantDomain;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnforceCanonicalHost
{
    public function handle(Request $request, Closure $next): Response
    {
        if ($this->shouldSkip($request)) {
            return $next($request);
        }

        $preferredHost = TenantDomain::preferredHost();
        $currentHost = $request->getHost();

        if (strcasecmp($currentHost, $preferredHost) !== 0) {
            $normalizedCurrent = TenantDomain::normalize($currentHost);
            $normalizedPreferred = TenantDomain::normalize($preferredHost);

            if ($normalizedCurrent === $normalizedPreferred) {
                $target = TenantDomain::baseUrl() . $request->getRequestUri();

                return redirect()->to($target, 301);
            }
        }

        $baseUrl = parse_url(TenantDomain::baseUrl());
        $requiresHttps = ($baseUrl['scheme'] ?? 'http') === 'https';

        if ($requiresHttps && !$request->secure() && !app()->runningUnitTests()) {
            return redirect()->secure($request->getRequestUri(), 301);
        }

        return $next($request);
    }

    private function shouldSkip(Request $request): bool
    {
        if ($request->is('up')) {
            return true;
        }

        $host = TenantDomain::normalize($request->getHost());

        return in_array($host, ['localhost', '127.0.0.1', '::1'], true);
    }
}
