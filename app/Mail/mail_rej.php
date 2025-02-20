<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class mail_rej extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Elements de contact
     */
    public $rejet_mails;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($rejet_mails, $user)
    {
        //
        // dd($demande_mails);
        $this->rejet_mails = $rejet_mails;

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
        // dd($this->demande_mails);
        return $this->from("w09nenebi@gmail.com")
                    ->subject("Alert Statut de la Demande !")
                    ->view('emails.Mail_validates',
                    [
                        'rejet_mails'=>$this->rejet_mails,
                        'user'=>$this->user
                    ]);
    }
}
