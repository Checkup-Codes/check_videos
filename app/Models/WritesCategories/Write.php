<?php

namespace App\Models\WritesCategories;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;
use App\Models\WritesCategories\Category;

class Write extends Model
{
    use HasFactory;

    protected $fillable = [
        'title', 'slug', 'content', 'author_id', 'published_at', 'summary', 'status', 'cover_image'
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

    public function category()
    {
        return $this->belongsTo(Category::class);
    }
}
