<?php

namespace App\Models\ParaPlan;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

class FiatPrice extends Model
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'api_paraplan_fiat_prices';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'base_currency',
        'quote_currency',
        'provider_symbol',
        'rate',
        'source',
        'price_time',
        'updated_at',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'price_time' => 'datetime',
            'rate' => 'decimal:8',
            'updated_at' => 'datetime',
            'created_at' => 'datetime',
        ];
    }

    /**
     * Set the created_at attribute (ensure it's in Turkey timezone)
     */
    public function setCreatedAtAttribute($value)
    {
        $this->attributes['created_at'] = $this->formatTurkeyTime($value);
    }

    /**
     * Set the updated_at attribute (ensure it's in Turkey timezone)
     */
    public function setUpdatedAtAttribute($value)
    {
        $this->attributes['updated_at'] = $this->formatTurkeyTime($value);
    }

    /**
     * Helper to format timestamps in Turkey timezone
     */
    private function formatTurkeyTime($value): string
    {
        if ($value instanceof Carbon) {
            return $value->setTimezone('Europe/Istanbul')->format('Y-m-d H:i:s');
        }

        if ($value) {
            return Carbon::parse($value, 'Europe/Istanbul')->format('Y-m-d H:i:s');
        }

        return Carbon::now('Europe/Istanbul')->format('Y-m-d H:i:s');
    }
}
