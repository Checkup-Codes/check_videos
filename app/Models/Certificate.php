<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Certificate extends Model
{
    use HasFactory;

    protected $table = 'crtf_certificates';

    protected $fillable = [
        'title',
        'slug',
        'issuer',
        'description',
        'image',
        'issue_date',
        'expiry_date',
        'credential_id',
        'credential_url',
        'skills',
        'status',
        'display_order',
    ];

    protected $casts = [
        'issue_date' => 'date',
        'expiry_date' => 'date',
        'skills' => 'array',
    ];

    /**
     * Boot method to auto-generate slug
     */
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($certificate) {
            if (empty($certificate->slug)) {
                $certificate->slug = Str::slug($certificate->title);
            }
        });

        static::updating(function ($certificate) {
            if ($certificate->isDirty('title') && empty($certificate->slug)) {
                $certificate->slug = Str::slug($certificate->title);
            }
        });
    }

    /**
     * Scope for active certificates
     */
    public function scopeActive($query)
    {
        return $query->where('status', 'active');
    }

    /**
     * Scope for ordering by display order
     */
    public function scopeOrdered($query)
    {
        return $query->orderBy('display_order', 'asc')->orderBy('issue_date', 'desc');
    }

    /**
     * Check if certificate is expired
     */
    public function isExpired()
    {
        if (!$this->expiry_date) {
            return false;
        }
        return $this->expiry_date->isPast();
    }

    /**
     * Get formatted issue date
     */
    public function getFormattedIssueDateAttribute()
    {
        return $this->issue_date->format('F Y');
    }

    /**
     * Get formatted expiry date
     */
    public function getFormattedExpiryDateAttribute()
    {
        return $this->expiry_date ? $this->expiry_date->format('F Y') : 'No Expiry';
    }
}
