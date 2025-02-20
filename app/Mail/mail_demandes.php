<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class mail_demandes extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Elements de contact
     */
    public $demande_mails;


    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($demande_mails, $user)
    {
        // dd($demande_mails->user->userProfile->isEmbauche);
        //
        // dd($demande_mails->objets->first()->classes);
        $this->demande_mails = $demande_mails;

        $this->user = $user;
        // dd($this->demande_mails);

    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        // dd('s');
        return $this->from("w09nenebi@gmail.com")
                    ->subject("Alert Statut de la Demande !")
                    ->view('emails.Mail_demandes',
                    [
                        'demande_mails'=>$this->demande_mails,
                        'user'=>$this->user
                    ]);
    }
}