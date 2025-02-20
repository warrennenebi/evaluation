<?php

namespace App\Listeners;

use Illuminate\Auth\Events\Logout;
use App\Models\Historique;

class LogUserLogout
{
    public function handle(Logout $event)
    {
        Historique::create([
            'user_id' => $event->user->id,
            'action' => 'Déconnexion',
            'ip_address' => request()->ip(),
            'performed_at' => now(),
        ]);
    }
}
