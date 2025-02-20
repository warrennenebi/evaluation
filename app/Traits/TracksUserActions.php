<?php

namespace App\Traits;

use App\Models\Historique;
use Illuminate\Support\Facades\Auth;

trait TracksUserActions
{
    /**
     * Enregistrer une action utilisateur.
     */
    public function logAction($action, $entity = null, $entityId = null)
    {
        Historique::create([
            'user_id' => Auth::id(),
            'action' => $action,
            'entity' => $entity,
            'entity_id' => $entityId,
            'ip_address' => request()->ip(),
            'user_agent' => request()->userAgent(),
        ]);
    }
}