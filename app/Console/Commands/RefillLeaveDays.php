<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\UserProfile;
use Carbon\Carbon;

class RefillLeaveDays extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'conge:refill';
    protected $description = 'Ajoute automatiquement 2,5 jours de congé aux utilisateurs dont le solde est à zéro à la fin du mois.';

    public function handle()
    {
        $today = Carbon::now();

        if ($today->isLastOfMonth()) { // Vérifier si on est à la fin du mois
            $users = UserProfile::where('jour_de_conger', 0)->get();

            foreach ($users as $user) {
                $user->increment('jour_de_conger', 2.5); // Ajouter 2,5 jours
            }

            $this->info(count($users) . ' utilisateurs ont reçu 2,5 jours de congé.');
        } else {
            $this->info("Aujourd'hui n'est pas la fin du mois.");
        }
    }
}
