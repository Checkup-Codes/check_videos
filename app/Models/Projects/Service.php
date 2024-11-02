<?php

namespace App\Models\Projects;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Service extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'slug',
        'description',
        'price',
        'sub_category_id',
    ];

    protected $keyType = 'string';
    public $incrementing = false;

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            if (empty($model->id)) {
                $model->id = (string) Str::uuid();
            }
        });
    }

    public function projects()
    {
        return $this->belongsToMany(Project::class, 'project_services', 'service_id', 'project_id');
    }

    public function subCategories()
    {
        return $this->hasMany(Service::class, 'sub_category_id');
    }


    public function parentCategory()
    {
        return $this->belongsTo(Service::class, 'sub_category_id');
    }
}
