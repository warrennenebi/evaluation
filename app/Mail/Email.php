<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;



class Email extends Mailable
{
    use Queueable, SerializesModels;


    public $nom;
    public $email;
    /**
     * Create a new message instance.
     */
    public function __construct($nom, $email)
    {
        $this->nom = $nom;
        $this->email = $email;
    }

    public function build()
    {
        return $this
            ->from('w09nenebi@gmail.com')
            ->subject('Test')
            ->view('mail_sended');
            // Options supplémentaires pour les fonctionnalités de l'API MailerSend
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        
        return new Envelope(
            subject: 'Email Test',
        );

    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}
 