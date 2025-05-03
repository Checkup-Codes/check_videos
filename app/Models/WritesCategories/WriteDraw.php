<?php

namespace App\Models\WritesCategories;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;
use App\Models\WritesCategories\Write;


class WriteDraw extends Model
{
    use HasFactory;

    protected $table = 'content_write_draws';
    protected $fillable = [
        'write_id',
        'elements',
        'version',
    ];

    public $incrementing = false;
    protected $keyType = 'string';

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            if (empty($model->{$model->getKeyName()})) {
                $model->{$model->getKeyName()} = (string) Str::uuid();
            }
        });
    }

    public function write()
    {
        return $this->belongsTo(Write::class, 'write_id');
    }
}
