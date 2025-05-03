<?php

namespace App\Models\Projects;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Project extends Model
{
    use HasFactory;

    protected $table = 'proj_projects';
    protected $keyType = 'string';
    public $incrementing = false;

    protected $fillable = ['project_name', 'customer_id'];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            if (empty($model->id)) {
                $model->id = (string) Str::uuid();
            }
        });
    }

    public function services()
    {
        return $this->belongsToMany(Service::class, 'proj_project_services', 'project_id', 'service_id');
    }


    public function customer()
    {
        return $this->belongsTo(Customer::class, 'customer_id');
    }
}
