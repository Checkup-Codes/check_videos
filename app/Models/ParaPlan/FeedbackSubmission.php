<?php

namespace App\Models\ParaPlan;

use Illuminate\Database\Eloquent\Model;

class FeedbackSubmission extends Model
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'api_paraplan_feedback_submissions';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'email',
        'message',
        'admin_message',
        'language',
        'platform',
        'status',
        'ip_address',
        'user_agent',
        'submitted_at',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'submitted_at' => 'datetime',
        ];
    }
}
