<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Mail;
use Carbon\Carbon;
use App\Mail\mail_rapport;
use App\Models\demande;
use App\Models\User;
use App\Models\UserProfile;
use App\Models\dem_objet_sg;
use App\Models\dem_objet_g;
use App\Models\dem_objet;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\SendEmailController;

class mail_rapports extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:mail_rapports';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Sends a daily summary report email';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        //
        $currentDate = Carbon::today()->format('Y-m-d'); // Get today's date in ISO format

        $demandes = \App\Models\demande::where('statut', 1)->where('type_demandes_id', 1)->whereDate('created_at', $currentDate)->with('user')->get();
            // dd($demandes);
            // $demandes2 = \App\Models\demande::where('user_id', 2)->with('types')->with('objets')->with('objetsg')->with('user')->with('documents')->with('notification')->orderBy('created_at', 'desc')->get();

        if ($demandes->isEmpty()) {
            $this->info('No demandes found with status 1 for today.');
            return;
        }

        // Prepare data for the email (assuming you have a mechanism to generate report data)
        $reportData = $this->prepareReportData($demandes); // Replace with your logic

        try {
            // Mail::send('emails.summary_report', $reportData, function ($message) {
            //     $message->to('w09nenebi@gmail.com')
            //         ->subject("Alert Rapport du jour");
            // });
            // (new SendEmailController())->NotificationRapport($reportData, 79);
            Mail::to(['w09nenebi@gmail.com'])
                ->send(new mail_rapport($demandes));

            $this->info('Summary report email sent successfully!');
        } catch (\Exception $e) {
            // $this->error('Error sending email: ' . $e);
            log::info($e);
        }
    }

    /**
     * Prepares data for the summary report email (replace with your logic).
     *
     * @param \Illuminate\Database\Eloquent\Collection $demandes
     * @return array
     */
    protected function prepareReportData($demandes)
    {
        // Implement your logic to generate report data based on $demandes
        // This could involve calculations, formatting, or retrieving additional data
        // Return an associative array containing the data you want to include in the email
        // For example:

        $totalDemandes = $demandes->count();
        $reportData = [
            'totalDemandes' => $totalDemandes,
            // Add other relevant data for the report
        ];

        return $reportData;
    }
}
