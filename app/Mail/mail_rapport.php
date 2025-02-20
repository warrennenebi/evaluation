<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class mail_rapport extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     */
    public $demandes;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($demandes)
    {
        //
        // dd($demande_mails);
        // $this->rejet_mails = $rejet_mails;

        $this->demandes = $demandes;
        // dd($this->demande_mails);

    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        // dd($this->demandes);
        return $this->from("w09nenebi@gmail.com")
                    ->subject("Alert Rapport du Jour !")
                    ->view('emails.summary_report',
                    [
                        // 'rejet_mails'=>$this->rejet_mails,
                        'demandes'=>$this->demandes
                    ]);
    }
}
