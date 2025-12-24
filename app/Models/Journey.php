<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Journey extends Model
{
    use HasFactory;

    protected $table = 'journeys';
    protected $keyType = 'string';
    public $incrementing = false;

    protected $fillable = [
        'entry_date',
        'title',
        'description',
        'image',
        'icon',
        'color',
        'status',
        'user_id',
    ];

    protected $casts = [
        'entry_date' => 'date',
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            if (empty($model->id)) {
                $model->id = (string) Str::uuid();
            }
        });
    }

    /**
     * Get the user that created the journey entry.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Scope to get published entries only.
     */
    public function scopePublished($query)
    {
        return $query->where('status', 'published');
    }

    /**
     * Scope to order by date descending (newest first).
     */
    public function scopeLatest($query)
    {
        return $query->orderBy('entry_date', 'desc')->orderBy('created_at', 'desc');
    }

    /**
     * Scope to order by date ascending (oldest first) for timeline.
     */
    public function scopeChronological($query)
    {
        return $query->orderBy('entry_date', 'asc')->orderBy('created_at', 'asc');
    }

    /**
     * Get entries grouped by year.
     */
    public static function getGroupedByYear($onlyPublished = true)
    {
        $query = $onlyPublished ? static::published() : static::query();
        
        return $query->latest()
            ->get()
            ->groupBy(function ($item) {
                return $item->entry_date->format('Y');
            });
    }

    /**
     * Get formatted date.
     */
    public function getFormattedDateAttribute()
    {
        return $this->entry_date->format('d M Y');
    }

    /**
     * Get year from entry date.
     */
    public function getYearAttribute()
    {
        return $this->entry_date->format('Y');
    }

    /**
     * Get month name from entry date.
     */
    public function getMonthAttribute()
    {
        return $this->entry_date->translatedFormat('F');
    }
}

