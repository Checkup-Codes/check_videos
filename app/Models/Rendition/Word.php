<?php

namespace App\Models\Rendition;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Support\Str;

class Word extends Model
{
    use HasFactory, HasUuids;

    protected $table = 'lang_words';
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
        'incorrect_count',
        'review_count',
        'last_review_date'
    ];

    protected $casts = [
        'flag' => 'boolean',
        'last_review_date' => 'datetime',
        'learning_status' => 'integer',
        'difficulty_level' => 'integer',
        'incorrect_count' => 'integer',
        'review_count' => 'integer',
    ];

    public function exampleSentences()
    {
        return $this->hasMany(ExampleSentence::class);
    }

    public function synonyms()
    {
        return $this->hasMany(Synonym::class);
    }

    public function languagePacks()
    {
        return $this->belongsToMany(LanguagePack::class, 'lang_word_pack_relations', 'word_id', 'pack_id');
    }
}
