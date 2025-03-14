<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class mailuser extends Mailable
{
    use Queueable, SerializesModels;

    public $user;
    public $defaultPassword;

    /**
     * Create a new message instance.
     */
    public function __construct($user, $defaultPassword)
    {
        $this->user = $user;
        $this->defaultPassword = $defaultPassword;
    }

    /**
     * Build the message.
     */
    public function build()
    {
        return $this->from("w09nenebi@gmail.com")
                    ->subject("Alert votre compte a été créé !")
                    ->view('emails.Mail_user_created',
                    [
                        'user' => $this->user->name,
                        'defaultPassword' => $this->defaultPassword,
                    ]);
    }
}
