<?php

namespace App\Listeners;

use Illuminate\Auth\Events\Login;
use App\Models\Historique;

class LogUserLogin
{
    public function handle(Login $event)
    {
        Historique::create([
            'user_id' => $event->user->id,
            'action' => 'Connexion',
            'ip_address' => request()->ip(),
            'performed_at' => now(),
        ]);
    }
}
