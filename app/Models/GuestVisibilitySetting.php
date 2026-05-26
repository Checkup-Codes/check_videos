<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class GuestVisibilitySetting extends Model
{
    protected $fillable = [
        'tests',
        'words',
        'services',
        'projects',
        'certificates',
        'bookmarks',
        'workspace',
    ];

    protected $casts = [
        'tests' => 'boolean',
        'words' => 'boolean',
        'services' => 'boolean',
        'projects' => 'boolean',
        'certificates' => 'boolean',
        'bookmarks' => 'boolean',
        'workspace' => 'boolean',
    ];

    public static function current(): self
    {
        return static::query()->first() ?? static::query()->create([]);
    }
}
