<?php

namespace App\Models\Projects;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class ProjectPayment extends Model
{
    use HasFactory;

    protected $table = 'proj_project_payments';
    protected $keyType = 'string';
    public $incrementing = false;

    protected $fillable = [
        'project_id',
        'service_id',
        'amount',
        'payment_date',
        'notes',
        'payment_method',
    ];

    protected $casts = [
        'amount' => 'decimal:2',
        'payment_date' => 'date',
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
}
