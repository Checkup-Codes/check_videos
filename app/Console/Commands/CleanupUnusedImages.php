<?php

namespace App\Console\Commands;

use App\Models\WritesCategories\Write;
use App\Models\WritesCategories\WriteImage;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;

class CleanupUnusedImages extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'writes:cleanup-images 
                            {--dry-run : Sadece rapor göster, silme yapma}
                            {--write= : Belirli bir write için temizlik yap}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Kullanılmayan write resimlerini temizle';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $dryRun = $this->option('dry-run');
        $writeId = $this->option('write');

        $this->info('🧹 Resim temizliği başlatılıyor...');
        $this->newLine();

        if ($dryRun) {
            $this->warn('⚠️  DRY RUN MODE - Hiçbir şey silinmeyecek');
            $this->newLine();
        }

        // Write'ları al
        $query = Write::query();
        if ($writeId) {
            $query->where('id', $writeId);
        }
        $writes = $query->get();

        if ($writes->isEmpty()) {
            $this->error('❌ Hiç write bulunamadı');
            return 1;
        }

        $this->info("📝 {$writes->count()} write kontrol edilecek");
        $this->newLine();

        $totalDeleted = 0;
        $totalSize = 0;

        $progressBar = $this->output->createProgressBar($writes->count());
        $progressBar->start();

        foreach ($writes as $write) {
            // İçerikteki resimleri al
            $imagesInContent = $this->extractImagesFromContent($write->content);

            // Bu write'a ait tüm resimleri al
            $allImages = WriteImage::where('related_id', $write->id)
                ->where('category', 'writes')
                ->get();

            foreach ($allImages as $image) {
                // Eğer resim içerikte yoksa
                if (!in_array($image->image_path, $imagesInContent)) {
                    $path = str_replace('/storage/', 'public/', $image->image_path);
                    
                    // Dosya boyutunu al
                    $size = 0;
                    if (Storage::exists($path)) {
                        $size = Storage::size($path);
                        $totalSize += $size;
                    }

                    if (!$dryRun) {
                        // Dosyayı sil
                        if (Storage::exists($path)) {
                            Storage::delete($path);
                        }

                        // Veritabanından sil
                        $image->delete();

                        Log::info('Unused image deleted', [
                            'write_id' => $write->id,
                            'write_title' => $write->title,
                            'image_path' => $image->image_path,
                            'size' => $size,
                        ]);
                    }

                    $totalDeleted++;
                }
            }

            $progressBar->advance();
        }

        $progressBar->finish();
        $this->newLine(2);

        // Sonuçları göster
        if ($totalDeleted > 0) {
            $this->info("✅ {$totalDeleted} kullanılmayan resim " . ($dryRun ? 'bulundu' : 'silindi'));
            $this->info("💾 Toplam " . $this->formatBytes($totalSize) . " alan " . ($dryRun ? 'temizlenebilir' : 'temizlendi'));
        } else {
            $this->info('✨ Temizlenecek resim bulunamadı');
        }

        return 0;
    }

    /**
     * İçerikten resim URL'lerini çıkar
     */
    private function extractImagesFromContent($content)
    {
        if (empty($content)) {
            return [];
        }

        $images = [];
        
        // img tag'lerini bul
        preg_match_all('/<img[^>]+src="([^">]+)"/', $content, $matches);
        
        if (!empty($matches[1])) {
            foreach ($matches[1] as $url) {
                // Full URL'den path'i çıkar
                if (strpos($url, '/storage/writes/') !== false) {
                    $parsed = parse_url($url);
                    $images[] = $parsed['path'] ?? $url;
                }
            }
        }

        return array_unique($images);
    }

    /**
     * Byte'ları okunabilir formata çevir
     */
    private function formatBytes($bytes, $precision = 2)
    {
        $units = ['B', 'KB', 'MB', 'GB', 'TB'];

        for ($i = 0; $bytes > 1024 && $i < count($units) - 1; $i++) {
            $bytes /= 1024;
        }

        return round($bytes, $precision) . ' ' . $units[$i];
    }
}
