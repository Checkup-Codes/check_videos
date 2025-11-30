<?php

namespace App\Models\Tests;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;
use Database\Factories\Tests\TestOptionFactory;

class TestOption extends Model
{
    use HasFactory;

    /**
     * Create a new factory instance for the model.
     */
    protected static function newFactory()
    {
        return TestOptionFactory::new();
    }

    protected $table = 'test_options';
    protected $fillable = [
        'question_id',
        'option_text',
        'is_correct',
        'order',
    ];

    public $incrementing = false;
    protected $keyType = 'string';

    protected $casts = [
        'is_correct' => 'boolean',
        'order' => 'integer',
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            if (empty($model->{$model->getKeyName()})) {
                $model->{$model->getKeyName()} = (string) Str::uuid();
            }
        });
    }

    public function question()
    {
        return $this->belongsTo(TestQuestion::class, 'question_id');
    }

    public function answers()
    {
        return $this->hasMany(TestAnswer::class, 'option_id');
    }
}
