<?php

namespace App\Models\FBVersions;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Version extends Model
{
    use HasFactory;

    protected $fillable = [
        'version',
        'release_date',
        'description'
    ];

    protected $keyType = 'string';
    public $incrementing = false;

    protected static function boot()
    {
        parent::boot();
        static::creating(function ($model) {
            if (empty($model->{$model->getKeyName()})) {
                $model->{$model->getKeyName()} = (string) Str::uuid();
            }
        });
    }


    public function features()
    {
        return $this->hasMany(Feature::class);
    }

    public function bugs()
    {
        return $this->hasMany(Bug::class);
    }
}
