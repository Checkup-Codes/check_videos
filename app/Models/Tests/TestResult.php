<?php

namespace App\Models\Tests;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;
use App\Models\User;
use Database\Factories\Tests\TestResultFactory;

class TestResult extends Model
{
    use HasFactory;

    /**
     * Create a new factory instance for the model.
     */
    protected static function newFactory()
    {
        return TestResultFactory::new();
    }

    protected $table = 'test_results';
    protected $fillable = [
        'test_id',
        'user_id',
        'participant_name',
        'score',
        'correct_answers',
        'total_questions',
        'completed_at',
        'time_taken',
    ];

    public $incrementing = false;
    protected $keyType = 'string';

    protected $casts = [
        'score' => 'decimal:2',
        'correct_answers' => 'integer',
        'total_questions' => 'integer',
        'completed_at' => 'datetime',
        'time_taken' => 'integer',
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

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function answers()
    {
        return $this->hasMany(TestAnswer::class, 'result_id');
    }
}
