<?php

namespace App\Models\Projects;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Project_Service extends Model
{
    use HasFactory;

    protected $table = 'proj_project_services';
    protected $keyType = 'string';
    public $incrementing = false;

    protected $fillable = [
        'project_id',
        'service_id',
        'price',
        'status',
        'payment_status',
        'notes',
        'service_start_date',
        'service_end_date',
    ];

    protected $casts = [
        'price' => 'decimal:2',
        'service_start_date' => 'date',
        'service_end_date' => 'date',
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

    public function project()
    {
        return $this->belongsTo(Project::class, 'project_id');
    }

    public function service()
    {
        return $this->belongsTo(Service::class, 'service_id');
    }

    public function payments()
    {
        return ProjectPayment::where('project_id', $this->project_id)
            ->where('service_id', $this->service_id);
    }

    public function todos()
    {
        return $this->hasMany(ProjectServiceTodo::class, 'service_id', 'service_id')
            ->where('project_id', $this->project_id);
    }

    /**
     * Calculate completion percentage based on todos
     */
    public function getCompletionPercentageAttribute()
    {
        $todos = $this->todos;
        if ($todos->isEmpty()) {
            return 0;
        }

        $completed = $todos->where('is_completed', true)->count();
        $total = $todos->count();

        return round(($completed / $total) * 100, 2);
    }
}
