<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Seo extends Model
{
    use HasFactory;

    protected $table = 'util_seos';
    public $incrementing = false;
    protected $keyType = 'string';

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            if (empty($model->{$model->getKeyName()})) {
                $model->{$model->getKeyName()} = Str::uuid()->toString();
            }
        });
    }

    protected $fillable = [
        'route',
        // Site Identity
        'site_name',
        'tagline',
        'title',
        'description',
        'keywords',
        'author',
        'language',
        'locale',
        // Open Graph
        'og_title',
        'og_description',
        'og_image',
        // Twitter Card
        'twitter_card',
        'twitter_site',
        'twitter_creator',
        // Icons
        'favicon',
        'apple_touch_icon',
        'theme_color',
        // Technical SEO
        'canonical_url',
        'robots',
        'schema_org',
        // Verification & Analytics
        'google_verification',
        'bing_verification',
        'yandex_verification',
        'google_analytics_id',
        'google_tag_manager_id',
    ];

    protected $casts = [
        'schema_org' => 'array',
    ];

    /**
     * Get full title with site name
     */
    public function getFullTitleAttribute(): string
    {
        if ($this->title && $this->site_name) {
            return "{$this->title} | {$this->site_name}";
        }
        return $this->title ?? $this->site_name ?? config('app.name');
    }

    /**
     * Get OG title with fallback
     */
    public function getOgTitleWithFallbackAttribute(): string
    {
        return $this->og_title ?? $this->title ?? $this->site_name ?? config('app.name');
    }

    /**
     * Get OG description with fallback
     */
    public function getOgDescriptionWithFallbackAttribute(): string
    {
        return $this->og_description ?? $this->description ?? '';
    }
}
