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

        // Kelime silindiğinde ilişkili verileri de sil
        static::deleting(function ($model) {
            $model->meanings()->delete();
            $model->synonyms()->delete();
            $model->exampleSentences()->delete();
        });
    }

    protected $fillable = [
        'word',
        'definition',
        'type',
        'language',
        'is_complete',
        'learning_status',
        'flag',
        'difficulty_level',
        'incorrect_count',
        'review_count',
        'last_review_date'
    ];

    protected $casts = [
        'flag' => 'boolean',
        'is_complete' => 'boolean',
        'last_review_date' => 'datetime',
        'learning_status' => 'integer',
        'difficulty_level' => 'integer',
        'incorrect_count' => 'integer',
        'review_count' => 'integer',
    ];

    /**
     * Scope: Sadece tamamlanmış kelimeler
     */
    public function scopeComplete($query)
    {
        return $query->where('is_complete', true);
    }

    /**
     * Scope: Sadece yarım kalan kelimeler
     */
    public function scopeIncomplete($query)
    {
        return $query->where('is_complete', false);
    }

    public function exampleSentences()
    {
        return $this->hasMany(ExampleSentence::class);
    }

    public function synonyms()
    {
        return $this->hasMany(Synonym::class);
    }

    public function meanings()
    {
        return $this->hasMany(WordMeaning::class);
    }

    public function primaryMeaning()
    {
        return $this->hasOne(WordMeaning::class)->where('is_primary', true);
    }

    public function languagePacks()
    {
        return $this->belongsToMany(LanguagePack::class, 'lang_word_pack_relations', 'word_id', 'pack_id');
    }

    // Accessor for backward compatibility
    public function getMeaningAttribute()
    {
        $primaryMeaning = $this->meanings()->where('is_primary', true)->first();

        if ($primaryMeaning) {
            return $primaryMeaning->meaning;
        }

        // If no primary meaning, return the first meaning or empty string
        $firstMeaning = $this->meanings()->first();
        return $firstMeaning ? $firstMeaning->meaning : '';
    }
}
