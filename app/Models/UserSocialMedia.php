<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserSocialMedia extends Model
{
    protected $table = 'user_social_media';

    protected $fillable = [
        'platform',
        'url',
        'is_active',
        'order'
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'order' => 'integer'
    ];
}
