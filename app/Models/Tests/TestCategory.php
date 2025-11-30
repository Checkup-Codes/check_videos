<?php

namespace App\Models\Tests;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;
use Database\Factories\Tests\TestCategoryFactory;

class TestCategory extends Model
{
    use HasFactory;

    /**
     * Create a new factory instance for the model.
     */
    protected static function newFactory()
    {
        return TestCategoryFactory::new();
    }

    protected $table = 'test_categories';
    protected $fillable = ['name', 'slug', 'parent_id', 'status', 'description'];

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

    public function tests()
    {
        return $this->hasMany(Test::class, 'category_id');
    }

    public function children()
    {
        return $this->hasMany(TestCategory::class, 'parent_id');
    }

    public function parent()
    {
        return $this->belongsTo(TestCategory::class, 'parent_id');
    }

    /**
     * Get the route key for the model.
     */
    public function getRouteKeyName()
    {
        return 'slug';
    }
}
