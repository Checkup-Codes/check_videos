<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\File;

class CleanupDotFolders extends Command
{
    protected $signature = 'tenant:cleanup-dots {--dry-run : Show what would be deleted without actually deleting}';

    protected $description = 'Remove empty dot folders from storage/multi (e.g., checkupcodes.com.)';

    public function handle()
    {
        $this->info("🧹 Cleaning up dot folders in storage/multi...");
        $this->newLine();
        
        $multiPath = storage_path('multi');
        
        if (!File::exists($multiPath)) {
            $this->warn("storage/multi directory not found");
            return 0;
        }
        
        $directories = File::directories($multiPath);
        $dotFolders = [];
        $emptyFolders = [];
        
        foreach ($directories as $dir) {
            $basename = basename($dir);
            
            // Check if folder ends with dot
            if (str_ends_with($basename, '.')) {
                $dotFolders[] = $dir;
                
                // Check if empty
                $contents = File::allFiles($dir);
                if (empty($contents)) {
                    $emptyFolders[] = $dir;
                }
            }
        }
        
        if (empty($dotFolders)) {
            $this->info("✅ No dot folders found");
            return 0;
        }
        
        $this->line("Found " . count($dotFolders) . " dot folder(s):");
        foreach ($dotFolders as $folder) {
            $isEmpty = in_array($folder, $emptyFolders);
            $status = $isEmpty ? '(empty)' : '(has files)';
            $this->line("  - " . basename($folder) . " {$status}");
        }
        
        $this->newLine();
        
        if ($this->option('dry-run')) {
            $this->info("🔍 Dry run mode - no files will be deleted");
            $this->line("Would delete " . count($emptyFolders) . " empty dot folder(s)");
            return 0;
        }
        
        if (empty($emptyFolders)) {
            $this->warn("⚠️  All dot folders contain files. Manual review recommended.");
            return 0;
        }
        
        if (!$this->confirm("Delete " . count($emptyFolders) . " empty dot folder(s)?", true)) {
            $this->info("Cancelled");
            return 0;
        }
        
        $deleted = 0;
        foreach ($emptyFolders as $folder) {
            try {
                File::deleteDirectory($folder);
                $this->line("✅ Deleted: " . basename($folder));
                $deleted++;
            } catch (\Exception $e) {
                $this->error("❌ Failed to delete " . basename($folder) . ": " . $e->getMessage());
            }
        }
        
        $this->newLine();
        $this->info("🎉 Cleanup completed! Deleted {$deleted} folder(s)");
        
        return 0;
    }
}

