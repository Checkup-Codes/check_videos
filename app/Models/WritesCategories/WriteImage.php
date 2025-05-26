<?php

namespace App\Models\WritesCategories;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class WriteImage extends Model
{
    use HasFactory;

    protected $table = 'write_images';

    protected $fillable = [
        'write_id',
        'image_path',
        'order',
        'alt_text',
        'title',
        'category', // base, writes, projects, products
        'related_id' // write_id, project_id, product_id vb.
    ];

    protected $appends = ['full_url', 'markdown_url'];

    public $incrementing = false;
    protected $keyType = 'string';

    const CATEGORY_BASE = 'base';
    const CATEGORY_WRITES = 'writes';
    const CATEGORY_PROJECTS = 'projects';
    const CATEGORY_PRODUCTS = 'products';
    const CATEGORY_AWARDS = 'awards';
    const CATEGORY_LOGO = 'logo';

    public static function getCategories()
    {
        return [
            self::CATEGORY_BASE => 'Genel',
            self::CATEGORY_WRITES => 'Yazılar',
            self::CATEGORY_PROJECTS => 'Projeler',
            self::CATEGORY_PRODUCTS => 'Ürünler',
            self::CATEGORY_AWARDS => 'Ödüller',
            self::CATEGORY_LOGO => 'Logo',
        ];
    }

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
        return $this->belongsTo(Write::class, 'related_id')->where('category', self::CATEGORY_WRITES);
    }

    public function getFullUrlAttribute()
    {
        return url($this->image_path);
    }

    public function getMarkdownUrlAttribute()
    {
        $title = $this->title ?: 'Image';
        return "![{$title}]({$this->full_url})";
    }
}
