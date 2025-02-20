<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserProfile extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'company_id',
        'phone_number',
        'ville',
        'date_embauche',
        'jour_de_conger',
        'pays_id',
        'isEmbauche',
        'directions_id',
        'filliales_id',
    ];

    public function id()
    {
        return $this->belongsTo(hardware::class);
    }

    public function filliale()
    {
        return $this->belongsTo(filliale::class);
    }

    // public function pays()
    // {
    //     return $this->belongsTo(pays::class);
    // }

    public function directions()
    {
        return $this->belongsTo(direction::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    function picture(){
        return $this->hasOne(Picture::class,'user_id');
    }
}
