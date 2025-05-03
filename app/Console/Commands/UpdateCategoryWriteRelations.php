<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\WritesCategories\Write;
use Illuminate\Support\Facades\DB;

class UpdateCategoryWriteRelations extends Command
{
    /**
     * Komutun adı ve imzası.
     *
     * @var string
     */
    protected $signature = 'writes:update-relations';

    /**
     * Komut açıklaması.
     *
     * @var string
     */
    protected $description = 'Var olan yazılar için content_category_write ilişki tablosunu günceller';

    /**
     * Komutun uygulanması
     */
    public function handle()
    {
        $this->info('Yazıların kategori ilişkileri güncelleniyor...');

        // Tüm yazıları al
        $writes = Write::whereNotNull('category_id')->get();
        $count = 0;

        foreach ($writes as $write) {
            // İlişki tablosunda bu yazı-kategori ilişkisi var mı kontrol et
            $exists = DB::table('content_category_write')
                ->where('write_id', $write->id)
                ->where('category_id', $write->category_id)
                ->exists();

            // Eğer yoksa ekle
            if (!$exists) {
                try {
                    DB::table('content_category_write')->insert([
                        'write_id' => $write->id,
                        'category_id' => $write->category_id,
                        'created_at' => now(),
                        'updated_at' => now()
                    ]);
                    $count++;
                } catch (\Exception $e) {
                    $this->error("Hata: {$write->id} ID'li yazı için ilişki eklenirken hata oluştu: " . $e->getMessage());
                }
            }
        }

        $this->info("Toplam {$count} kategori-yazı ilişkisi eklendi.");

        return Command::SUCCESS;
    }
}
