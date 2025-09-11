<?php

namespace App\Models\Rendition;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Support\Str;

class LanguagePack extends Model
{
    use HasFactory, HasUuids;

    protected $table = 'lang_language_packs';
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

        // Paket silindiğinde ilişkili kelimeleri de sil
        static::deleting(function ($model) {
            // Pakete bağlı tüm kelimeleri al ve sil
            $words = $model->words;
            foreach ($words as $word) {
                $word->delete(); // Word modelindeki cascade delete çalışacak
            }

            // Pivot table ilişkilerini temizle
            $model->words()->detach();
        });
    }

    protected $fillable = [
        'name',
        'slug',
        'description',
        'language'
    ];

    public function words()
    {
        return $this->belongsToMany(Word::class, 'lang_word_pack_relations', 'pack_id', 'word_id');
    }
}
