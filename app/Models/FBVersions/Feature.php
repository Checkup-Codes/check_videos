<?php

namespace App\Models\FBVersions;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Feature extends Model
{
    use HasFactory;

    protected $table = 'version_features';
    protected $keyType = 'string';
    public $incrementing = false;

    protected $fillable = ['feature_name', 'feature_detail'];


    protected static function boot()
    {
        parent::boot();
        static::creating(function ($model) {
            if (empty($model->{$model->getKeyName()})) {
                $model->{$model->getKeyName()} = (string) Str::uuid();
            }
        });
    }
}
