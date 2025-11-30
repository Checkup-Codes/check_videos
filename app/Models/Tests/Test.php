<?php

namespace App\Models\Tests;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;
use App\Models\User;
use Database\Factories\Tests\TestFactory;

class Test extends Model
{
    use HasFactory;

    /**
     * Create a new factory instance for the model.
     */
    protected static function newFactory()
    {
        return TestFactory::new();
    }

    protected $table = 'tests';
    protected $fillable = [
        'title',
        'slug',
        'description',
        'category_id',
        'author_id',
        'status',
        'time_limit',
        'total_questions',
        'total_points',
        'published_at',
    ];

    const STATUS_DRAFT = 'draft';
    const STATUS_PUBLISHED = 'published';
    const STATUS_PRIVATE = 'private';

    public static function getValidStatuses()
    {
        return [
            self::STATUS_DRAFT,
            self::STATUS_PUBLISHED,
            self::STATUS_PRIVATE,
        ];
    }

    public $incrementing = false;
    protected $keyType = 'string';

    protected $casts = [
        'published_at' => 'datetime',
        'time_limit' => 'integer',
        'total_questions' => 'integer',
        'total_points' => 'integer',
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

    public function category()
    {
        return $this->belongsTo(TestCategory::class, 'category_id');
    }

    public function author()
    {
        return $this->belongsTo(User::class, 'author_id');
    }

    public function questions()
    {
        return $this->hasMany(TestQuestion::class, 'test_id')->orderBy('order');
    }

    public function results()
    {
        return $this->hasMany(TestResult::class, 'test_id');
    }

    /**
     * Get the route key for the model.
     */
    public function getRouteKeyName()
    {
        return 'slug';
    }
}
