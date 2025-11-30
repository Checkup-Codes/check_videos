<?php

namespace App\Models\Tests;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;
use Database\Factories\Tests\TestAnswerFactory;

class TestAnswer extends Model
{
    use HasFactory;

    /**
     * Create a new factory instance for the model.
     */
    protected static function newFactory()
    {
        return TestAnswerFactory::new();
    }

    protected $table = 'test_answers';
    protected $fillable = [
        'result_id',
        'question_id',
        'option_id',
        'is_correct',
    ];

    public $incrementing = false;
    protected $keyType = 'string';

    protected $casts = [
        'is_correct' => 'boolean',
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

    public function result()
    {
        return $this->belongsTo(TestResult::class, 'result_id');
    }

    public function question()
    {
        return $this->belongsTo(TestQuestion::class, 'question_id');
    }

    public function option()
    {
        return $this->belongsTo(TestOption::class, 'option_id');
    }
}
