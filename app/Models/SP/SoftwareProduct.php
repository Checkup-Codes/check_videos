<?php

namespace App\Models\SP;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class SoftwareProduct extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'slug',
        'description',
        'price',
        'stock',
        'category',
        'version',
        'platform',
        'license_key',
        'is_subscription',
        'subscription_duration',
        'download_url',
        'system_requirements',
    ];
    /**
     * The "booting" method of the model.
     *
     * @return void
     */
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            if (empty($model->{$model->getKeyName()})) {
                $model->{$model->getKeyName()} = (string) Str::uuid();
            }
        });
    }

    /**
     * Get the primary key for the model.
     *
     * @return string
     */
    public function getKeyType()
    {
        return 'string';
    }

    /**
     * Indicates if the IDs are auto-incrementing.
     *
     * @return bool
     */
    public function getIncrementing()
    {
        return false;
    }
}
