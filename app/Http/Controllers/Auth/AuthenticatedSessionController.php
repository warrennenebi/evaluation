<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Providers\RouteServiceProvider;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\View\View;
use App\Traits\TracksUserActions;

class AuthenticatedSessionController extends Controller
{
    use TracksUserActions;
    /**
     * Display the login view.
     */
    public function create(): View
    {
        return view('auth.login');
    }

    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request): RedirectResponse
    {
        $request['active']=1;

        $request->authenticate();

        $request->session()->regenerate();

        // Mettez à jour le champ 'first_login' lors de la première connexion
        if (Auth::user()->first_login) {
            return redirect('change-password');
        }
        elseif (Auth::user()->hasRole('superadmin')) {
            return redirect()->route('traceability.index'); // Rediriger vers la table de traçabilité
        }
        else
        {
            // Redirige l'utilisateur après la connexion réussie
            return redirect()->intended(RouteServiceProvider::HOME);
        }
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): RedirectResponse
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect('login');
    }
}
