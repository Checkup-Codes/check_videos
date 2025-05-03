<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;

class LoginController extends Controller
{
    /**
     * The user has been authenticated.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  mixed  $user
     * @return mixed
     */
    protected function authenticated(Request $request, $user)
    {
        // İşlemleriniz...

        // Cache'i temizle
        $this->clearApplicationCache();

        return redirect()->intended($this->redirectPath());
    }

    /**
     * Log the user out of the application.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function logout(Request $request)
    {
        $this->guard()->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        // Cache'i temizle
        $this->clearApplicationCache();

        return $this->loggedOut($request) ?: redirect('/');
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
                'content_categories',
                'content_writes',
                'content_writes_all'
            ];

            foreach ($cacheKeys as $key) {
                Cache::forget($key);
            }

            Log::info('LoginController üzerinden cache temizlendi.');
        } catch (\Exception $e) {
            Log::error('LoginController üzerinden cache temizlenirken hata: ' . $e->getMessage());
        }
    }
}
