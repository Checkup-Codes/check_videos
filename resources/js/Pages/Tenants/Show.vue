<template>
    <AuthenticatedLayout>
        <div class="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 py-8">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <!-- Header -->
                <div class="mb-8">
                    <div class="flex items-center gap-4 mb-4">
                        <a
                            href="/tenants"
                            class="px-4 py-2 bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-900 dark:text-white rounded-lg font-medium transition-colors"
                        >
                            ← Geri
                        </a>
                        <h1 class="text-3xl font-bold text-slate-900 dark:text-white">
                            📊 {{ tenant.name }}
                        </h1>
                        <span v-if="tenant.type === 'main'" class="px-3 py-1 bg-blue-600 text-white rounded-full text-sm font-semibold">
                            ANA DOMAIN
                        </span>
                    </div>
                    <div class="flex items-center gap-4">
                        <a
                            :href="`https://${tenant.domain}`"
                            target="_blank"
                            class="text-blue-600 dark:text-blue-400 hover:underline font-medium"
                        >
                            {{ tenant.domain }} ↗
                        </a>
                        <span class="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full text-sm font-medium">
                            {{ tenant.type }}
                        </span>
                    </div>
                </div>

                <!-- Summary Cards -->
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <!-- Database Card -->
                    <div class="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-6 border border-slate-200 dark:border-slate-700">
                        <div class="flex items-center justify-between mb-4">
                            <h3 class="text-lg font-semibold text-slate-900 dark:text-white">Database</h3>
                            <span class="text-3xl">💾</span>
                        </div>
                        <div class="space-y-2">
                            <div class="flex justify-between">
                                <span class="text-slate-600 dark:text-slate-400">Boyut:</span>
                                <span class="font-bold text-slate-900 dark:text-white">{{ tenant.database.size_formatted }}</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-slate-600 dark:text-slate-400">Tablolar:</span>
                                <span class="font-bold text-slate-900 dark:text-white">{{ tenant.database.tables }}</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-slate-600 dark:text-slate-400">İsim:</span>
                                <span class="font-mono text-sm text-slate-900 dark:text-white">{{ tenant.database.name }}</span>
                            </div>
                        </div>
                    </div>

                    <!-- Storage Card -->
                    <div class="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-6 border border-slate-200 dark:border-slate-700">
                        <div class="flex items-center justify-between mb-4">
                            <h3 class="text-lg font-semibold text-slate-900 dark:text-white">Storage</h3>
                            <span class="text-3xl">📁</span>
                        </div>
                        <div class="space-y-2">
                            <div class="flex justify-between">
                                <span class="text-slate-600 dark:text-slate-400">Boyut:</span>
                                <span class="font-bold text-slate-900 dark:text-white">{{ tenant.storage.size_formatted }}</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-slate-600 dark:text-slate-400">Dosyalar:</span>
                                <span class="font-bold text-slate-900 dark:text-white">{{ tenant.storage.files }}</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-slate-600 dark:text-slate-400">Klasörler:</span>
                                <span class="font-bold text-slate-900 dark:text-white">{{ tenant.storage.folders?.length || 0 }}</span>
                            </div>
                        </div>
                    </div>

                    <!-- Total Card -->
                    <div class="bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-sm p-6 text-white">
                        <div class="flex items-center justify-between mb-4">
                            <h3 class="text-lg font-semibold">Toplam Kullanım</h3>
                            <span class="text-3xl">📈</span>
                        </div>
                        <div class="space-y-2">
                            <div class="text-4xl font-bold">
                                {{ formatBytes(tenant.database.size + tenant.storage.size) }}
                            </div>
                            <div class="text-blue-100 text-sm">
                                Database + Storage
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Database Tables -->
                <div v-if="tenant.database.exists" class="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden mb-8">
                    <div class="p-6 border-b border-slate-200 dark:border-slate-700">
                        <h2 class="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                            <span>💾</span>
                            Database Tabloları
                        </h2>
                        <p class="text-sm text-slate-600 dark:text-slate-400 mt-1">
                            {{ tenant.database.name }} - Toplam {{ tenant.database.tables }} tablo
                        </p>
                    </div>
                    
                    <!-- Error State -->
                    <div v-if="tenant.database.error && !tenant.database.table_details?.length" class="p-6">
                        <div class="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                            <div class="flex items-start gap-3">
                                <span class="text-2xl">⚠️</span>
                                <div>
                                    <p class="text-sm font-semibold text-yellow-800 dark:text-yellow-400 mb-1">
                                        Tablo detayları yüklenemedi
                                    </p>
                                    <p class="text-xs text-yellow-700 dark:text-yellow-500">
                                        {{ tenant.database.error }}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Table List -->
                    <div v-else-if="tenant.database.table_details?.length" class="overflow-x-auto">
                        <table class="w-full">
                            <thead class="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-700">
                                <tr>
                                    <th class="px-6 py-3 text-left text-sm font-semibold text-slate-900 dark:text-white">Tablo Adı</th>
                                    <th class="px-6 py-3 text-right text-sm font-semibold text-slate-900 dark:text-white">Satırlar</th>
                                    <th class="px-6 py-3 text-right text-sm font-semibold text-slate-900 dark:text-white">Data</th>
                                    <th class="px-6 py-3 text-right text-sm font-semibold text-slate-900 dark:text-white">Index</th>
                                    <th class="px-6 py-3 text-right text-sm font-semibold text-slate-900 dark:text-white">Toplam</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-slate-200 dark:divide-slate-700">
                                <tr
                                    v-for="table in tenant.database.table_details"
                                    :key="table.name"
                                    class="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
                                >
                                    <td class="px-6 py-3 font-mono text-sm text-slate-900 dark:text-white">
                                        {{ table.name }}
                                    </td>
                                    <td class="px-6 py-3 text-right text-slate-600 dark:text-slate-400">
                                        {{ table.rows.toLocaleString() }}
                                    </td>
                                    <td class="px-6 py-3 text-right text-slate-600 dark:text-slate-400">
                                        {{ formatBytes(table.data_size) }}
                                    </td>
                                    <td class="px-6 py-3 text-right text-slate-600 dark:text-slate-400">
                                        {{ formatBytes(table.index_size) }}
                                    </td>
                                    <td class="px-6 py-3 text-right font-semibold text-slate-900 dark:text-white">
                                        {{ table.total_size_formatted }}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    
                    <!-- Empty State -->
                    <div v-else class="p-12 text-center">
                        <div class="w-16 h-16 bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span class="text-3xl">📊</span>
                        </div>
                        <p class="text-slate-500 dark:text-slate-400">
                            Bu database'de henüz tablo yok
                        </p>
                    </div>
                </div>

                <!-- Storage Folders -->
                <div v-if="tenant.storage.exists && tenant.storage.folders" class="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden mb-8">
                    <div class="p-6 border-b border-slate-200 dark:border-slate-700">
                        <h2 class="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                            <span>📁</span>
                            Storage Klasörleri
                        </h2>
                        <p class="text-sm text-slate-600 dark:text-slate-400 mt-1">
                            {{ tenant.storage.path }}
                        </p>
                    </div>
                    <div class="overflow-x-auto">
                        <table class="w-full">
                            <thead class="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-700">
                                <tr>
                                    <th class="px-6 py-3 text-left text-sm font-semibold text-slate-900 dark:text-white">Klasör</th>
                                    <th class="px-6 py-3 text-right text-sm font-semibold text-slate-900 dark:text-white">Dosyalar</th>
                                    <th class="px-6 py-3 text-right text-sm font-semibold text-slate-900 dark:text-white">Resimler</th>
                                    <th class="px-6 py-3 text-right text-sm font-semibold text-slate-900 dark:text-white">Boyut</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-slate-200 dark:divide-slate-700">
                                <tr
                                    v-for="folder in tenant.storage.folders"
                                    :key="folder.name"
                                    class="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
                                >
                                    <td class="px-6 py-3">
                                        <div class="flex items-center gap-2">
                                            <span class="text-xl">📂</span>
                                            <span class="font-medium text-slate-900 dark:text-white">{{ folder.name }}</span>
                                        </div>
                                    </td>
                                    <td class="px-6 py-3 text-right text-slate-600 dark:text-slate-400">
                                        {{ folder.files.toLocaleString() }}
                                    </td>
                                    <td class="px-6 py-3 text-right">
                                        <span class="px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 rounded text-sm font-medium">
                                            🖼️ {{ folder.images }}
                                        </span>
                                    </td>
                                    <td class="px-6 py-3 text-right font-semibold text-slate-900 dark:text-white">
                                        {{ folder.size_formatted }}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <!-- Environment Configuration -->
                <div v-if="tenant.env.exists" class="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
                    <div class="p-6 border-b border-slate-200 dark:border-slate-700">
                        <h2 class="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                            <span>⚙️</span>
                            Environment Konfigürasyonu
                        </h2>
                        <p class="text-sm text-slate-600 dark:text-slate-400 mt-1">
                            {{ tenant.env.path }} • {{ tenant.env.size_formatted }} • Son değişiklik: {{ formatDate(tenant.env.modified_at) }}
                        </p>
                    </div>
                    <div class="p-6">
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div
                                v-for="(value, key) in tenant.env.config"
                                :key="key"
                                class="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-lg"
                            >
                                <div class="text-sm font-semibold text-slate-600 dark:text-slate-400 mb-1">
                                    {{ key }}
                                </div>
                                <div class="font-mono text-sm text-slate-900 dark:text-white break-all">
                                    {{ value }}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </AuthenticatedLayout>
</template>

<script setup lang="ts">
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';

interface TableDetail {
    name: string;
    rows: number;
    data_size: number;
    index_size: number;
    total_size: number;
    total_size_formatted: string;
}

interface FolderDetail {
    name: string;
    path: string;
    size: number;
    size_formatted: string;
    files: number;
    images: number;
}

interface Database {
    name: string;
    exists: boolean;
    size: number;
    size_formatted: string;
    tables: number;
    table_details?: TableDetail[];
}

interface Storage {
    exists: boolean;
    path?: string;
    size: number;
    size_formatted: string;
    files: number;
    folders?: FolderDetail[];
}

interface Env {
    exists: boolean;
    path?: string;
    size?: number;
    size_formatted?: string;
    modified_at?: number;
    config?: Record<string, string>;
}

interface Tenant {
    domain: string;
    name: string;
    type: string;
    database: Database;
    storage: Storage;
    env: Env;
}

interface Props {
    tenant: Tenant;
}

defineProps<Props>();

const formatBytes = (bytes: number, precision: number = 2): string => {
    const units = ['B', 'KB', 'MB', 'GB', 'TB'];
    let size = bytes;
    let unitIndex = 0;
    
    while (size > 1024 && unitIndex < units.length - 1) {
        size /= 1024;
        unitIndex++;
    }
    
    return `${size.toFixed(precision)} ${units[unitIndex]}`;
};

const formatDate = (timestamp: number): string => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString('tr-TR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });
};
</script>
