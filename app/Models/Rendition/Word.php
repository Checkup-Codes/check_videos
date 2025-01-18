<?php

namespace App\Models\Rendition;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Support\Str;

class Word extends Model
{
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
        'word',
        'meaning',
        'type',
        'language',
        'learning_status',
        'flag',
        'difficulty_level',
        'correct_count',
        'incorrect_count',
        'review_count',
        'last_review_date'
    ];

    protected $casts = [
        'flag' => 'boolean',
        'last_review_date' => 'date',
    ];

    public function exampleSentences()
    {
        return $this->hasMany(ExampleSentence::class);
    }

    public function languagePacks()
    {
        return $this->belongsToMany(LanguagePack::class, 'word_pack_relations');
    }
}
