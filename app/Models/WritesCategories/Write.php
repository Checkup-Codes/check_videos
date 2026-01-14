<?php

namespace App\Models\WritesCategories;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;
use App\Models\WritesCategories\Category;

class Write extends Model
{
    use HasFactory;

    protected $table = 'content_writes';
    protected $fillable = [
        'title',
        'slug',
        'content',
        'author_id',
        'category_id',
        'published_at',
        'summary',
        'status',
        'views_count',
        'seo_keywords',
        'tags',
        'meta_description',
        'cover_image',
        'hasDraw',
        'youtube_url',
    ];

    const STATUS_DRAFT = 'draft';
    const STATUS_PUBLISHED = 'published';
    const STATUS_PRIVATE = 'private';
    const STATUS_LINK_ONLY = 'link_only';

    public static function getValidStatuses()
    {
        return [
            self::STATUS_DRAFT,
            self::STATUS_PUBLISHED,
            self::STATUS_PRIVATE,
            self::STATUS_LINK_ONLY,
        ];
    }

    public function isLinkOnly()
    {
        return $this->status === self::STATUS_LINK_ONLY;
    }

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

    public function categories()
    {
        return $this->belongsToMany(Category::class, 'content_category_write', 'write_id', 'category_id');
    }

    public function writeDraws()
    {
        return $this->hasMany(WriteDraw::class, 'write_id');
    }

    public function images()
    {
        return $this->hasMany(WriteImage::class)->orderBy('order');
    }
}
