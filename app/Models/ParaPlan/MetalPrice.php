<?php

namespace App\Models\ParaPlan;

use Illuminate\Database\Eloquent\Model;

class MetalPrice extends Model
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'api_paraplan_metal_prices';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'base_symbol',
        'quote_currency',
        'provider_symbol',
        'price',
        'price_time',
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
            'price' => 'decimal:8',
        ];
    }
}
