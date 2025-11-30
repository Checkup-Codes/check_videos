<?php

namespace App\Models\Tests;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;
use Database\Factories\Tests\TestQuestionFactory;

class TestQuestion extends Model
{
    use HasFactory;

    /**
     * Create a new factory instance for the model.
     */
    protected static function newFactory()
    {
        return TestQuestionFactory::new();
    }

    protected $table = 'test_questions';
    protected $fillable = [
        'test_id',
        'question_text',
        'question_type',
        'order',
        'points',
        'explanation',
    ];

    public $incrementing = false;
    protected $keyType = 'string';

    protected $casts = [
        'order' => 'integer',
        'points' => 'integer',
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

    public function test()
    {
        return $this->belongsTo(Test::class, 'test_id');
    }

    public function options()
    {
        return $this->hasMany(TestOption::class, 'question_id')->orderBy('order');
    }

    public function answers()
    {
        return $this->hasMany(TestAnswer::class, 'question_id');
    }
}
