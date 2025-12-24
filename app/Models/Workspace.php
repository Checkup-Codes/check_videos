<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Workspace extends Model
{
    use HasFactory;

    protected $table = 'workspace_workspaces';
    protected $keyType = 'string';
    public $incrementing = false;

    protected $fillable = [
        'images',
        'status',
        'user_id',
    ];

    protected $casts = [
        'images' => 'array',
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
     * Get the user that created the workspace.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the products for this workspace.
     */
    public function products()
    {
        return $this->hasMany(WorkspaceProduct::class)->orderBy('order');
    }

    /**
     * Scope to get published workspaces only.
     */
    public function scopePublished($query)
    {
        return $query->where('status', 'published');
    }
}
