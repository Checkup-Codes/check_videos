<?php

namespace App\Models\Rendition;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WordPackRelation extends Model
{
    use HasFactory;

    protected $table = 'lang_word_pack_relations';
    protected $fillable = [
        'word_id',
        'pack_id'
    ];

    public function word()
    {
        return $this->belongsTo(Word::class, 'word_id');
    }

    public function pack()
    {
        return $this->belongsTo(LanguagePack::class, 'pack_id');
    }
}
