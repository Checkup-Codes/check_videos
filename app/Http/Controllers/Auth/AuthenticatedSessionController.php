<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Inertia\Response;

class AuthenticatedSessionController extends Controller
{
    /**
     * Display the login view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Login', [
            'canResetPassword' => Route::has('password.request'),
            'status' => session('status'),
        ]);
    }

    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request): RedirectResponse
    {
        $request->authenticate();

        $request->session()->regenerate();

        // Login işleminden sonra cache'i temizle
        $this->clearApplicationCache();

        return redirect()->intended(route('dashboard', absolute: false));
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): RedirectResponse
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        // Logout işleminden sonra cache'i temizle
        $this->clearApplicationCache();

        return redirect('/');
    }

    /**
     * Uygulama cache'ini temizler.
     * 
     * @return void
     */
    private function clearApplicationCache()
    {
        try {
            $cacheKeys = [
                'categories',
                'writes',
                'writes_all'
            ];

            foreach ($cacheKeys as $key) {
                Cache::forget($key);
            }

            Log::info('AuthController üzerinden cache temizlendi.');
        } catch (\Exception $e) {
            Log::error('AuthController üzerinden cache temizlenirken hata: ' . $e->getMessage());
        }
    }
}
