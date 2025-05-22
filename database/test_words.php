<?php

require __DIR__ . '/../vendor/autoload.php';

$app = require_once __DIR__ . '/../bootstrap/app.php';
$app->make(\Illuminate\Contracts\Console\Kernel::class)->bootstrap();

use App\Models\Rendition\Word;
use App\Models\Rendition\WordMeaning;
use Illuminate\Support\Str;

// Create a new word with multiple meanings
$word = Word::create([
    'word' => 'test',
    'type' => 'noun',
    'language' => 'en',
    'learning_status' => 0,
    'difficulty_level' => 1,
    'flag' => false,
    'incorrect_count' => 0,
    'review_count' => 0,
]);

// Add multiple meanings to the word
$word->meanings()->create([
    'meaning' => 'test (primary meaning)',
    'is_primary' => true,
    'display_order' => 0,
]);

$word->meanings()->create([
    'meaning' => 'test (secondary meaning)',
    'is_primary' => false,
    'display_order' => 1,
]);

// Retrieve the word with its meanings
$retrievedWord = Word::with('meanings')->find($word->id);

// Display the word and its meanings
echo "Word: " . $retrievedWord->word . "\n";
echo "Type: " . $retrievedWord->type . "\n";
echo "Meanings:\n";

foreach ($retrievedWord->meanings as $meaning) {
    echo "- " . $meaning->meaning . " (Primary: " . ($meaning->is_primary ? 'Yes' : 'No') . ")\n";
}

// Test the automatic meaning accessor
echo "\nAccessed via the meaning accessor: " . $retrievedWord->meaning . "\n";
