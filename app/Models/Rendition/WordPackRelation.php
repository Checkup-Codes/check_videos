<?php

namespace App\Models\Rendition;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Support\Str;

class WordPackRelation extends Model
{
    use HasFactory, HasUuids;

    public $incrementing = false;
    protected $keyType = 'string';

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            if (empty($model->{$model->getKeyName()})) {
                $model->{$model->getKeyName()} = (string) Str::uuid();
            }
        });
    }

    protected $fillable = [
        'word_id',
        'pack_id'
    ];

    public function word()
    {
        return $this->belongsTo(Word::class);
    }

    public function languagePack()
    {
        return $this->belongsTo(LanguagePack::class, 'pack_id');
    }
}
