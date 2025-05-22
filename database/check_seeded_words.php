<?php

require __DIR__ . '/../vendor/autoload.php';

$app = require_once __DIR__ . '/../bootstrap/app.php';
$app->make(\Illuminate\Contracts\Console\Kernel::class)->bootstrap();

use App\Models\Rendition\Word;
use App\Models\Rendition\LanguagePack;

// Get the first word
$word = Word::with('meanings')->first();

if ($word) {
    echo "Word found: " . $word->word . "\n";
    echo "Type: " . $word->type . "\n";
    echo "Language: " . $word->language . "\n";

    echo "Meanings (" . $word->meanings->count() . "):\n";
    foreach ($word->meanings as $meaning) {
        echo "- " . $meaning->meaning . " (Primary: " . ($meaning->is_primary ? 'Yes' : 'No') . ")\n";
    }

    // Test the automatic meaning accessor
    echo "\nAccessed via the meaning accessor: " . $word->meaning . "\n";
} else {
    echo "No words found in the database.\n";
}

// Check language packs
$packs = LanguagePack::withCount('words')->get();
echo "\nLanguage Packs:\n";
foreach ($packs as $pack) {
    echo "- " . $pack->name . " (" . $pack->words_count . " words)\n";
}
