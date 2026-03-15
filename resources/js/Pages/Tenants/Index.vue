<template>
    <AuthenticatedLayout>
        <div class="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 py-8">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <!-- Header -->
                <div class="mb-8">
                    <h1 class="text-3xl font-bold text-slate-900 dark:text-white">
                        🏢 Tenant Yönetimi
                    </h1>
                    <p class="mt-2 text-slate-600 dark:text-slate-400">
                        Tüm tenantlarınızı buradan yönetin
                    </p>
                </div>

                <!-- Stats Cards -->
                <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div class="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-6 border border-slate-200 dark:border-slate-700">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-sm font-medium text-slate-600 dark:text-slate-400">Toplam Tenant</p>
                                <p class="text-3xl font-bold text-slate-900 dark:text-white mt-2">
                                    {{ stats.total_tenants }}
                                </p>
                            </div>
                            <div class="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                                <span class="text-2xl">🏢</span>
                            </div>
                        </div>
                    </div>

                    <div class="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-6 border border-slate-200 dark:border-slate-700">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-sm font-medium text-slate-600 dark:text-slate-400">Database Boyutu</p>
                                <p class="text-3xl font-bold text-slate-900 dark:text-white mt-2">
                                    {{ stats.total_db_size_formatted }}
                                </p>
                            </div>
                            <div class="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                                <span class="text-2xl">💾</span>
                            </div>
                        </div>
                    </div>

                    <div class="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-6 border border-slate-200 dark:border-slate-700">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-sm font-medium text-slate-600 dark:text-slate-400">Storage Boyutu</p>
                                <p class="text-3xl font-bold text-slate-900 dark:text-white mt-2">
                                    {{ stats.total_storage_size_formatted }}
                                </p>
                            </div>
                            <div class="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                                <span class="text-2xl">📁</span>
                            </div>
                        </div>
                    </div>

                    <div class="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-6 border border-slate-200 dark:border-slate-700">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-sm font-medium text-slate-600 dark:text-slate-400">Toplam Dosya</p>
                                <p class="text-3xl font-bold text-slate-900 dark:text-white mt-2">
                                    {{ stats.total_files }}
                                </p>
                            </div>
                            <div class="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center">
                                <span class="text-2xl">📄</span>
                            </div>
                        </div>
                    </div>
                </div>


                <!-- Important Notice -->
                <div class="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-6 rounded-lg mb-6">
                    <div class="flex items-start gap-4">
                        <span class="text-3xl">ℹ️</span>
                        <div>
                            <h3 class="text-lg font-semibold text-blue-900 dark:text-blue-300 mb-2">
                                Yeni Tenant Eklemeden Önce
                            </h3>
                            <ol class="space-y-2 text-sm text-blue-800 dark:text-blue-400">
                                <li class="flex items-start gap-2">
                                    <span class="font-bold">1.</span>
                                    <span><strong>Hostinger'da domain satın al</strong> (örn: candundar.com)</span>
                                </li>
                                <li class="flex items-start gap-2">
                                    <span class="font-bold">2.</span>
                                    <span><strong>Domain'i {{ mainDomain }}'e park et</strong> (DNS ayarları)</span>
                                </li>
                                <li class="flex items-start gap-2">
                                    <span class="font-bold">3.</span>
                                    <span><strong>5-10 dakika bekle</strong> (DNS yayılması için)</span>
                                </li>
                                <li class="flex items-start gap-2">
                                    <span class="font-bold">4.</span>
                                    <span><strong>Buradan tenant oluştur</strong> (aşağıdaki buton ile)</span>
                                </li>
                            </ol>
                        </div>
                    </div>
                </div>

                <!-- Actions -->
                <div class="flex gap-4 mb-6">
                    <button
                        @click="showCreateModal = true"
                        class="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
                    >
                        <span class="text-xl">➕</span>
                        Yeni Tenant Ekle
                    </button>

                    <button
                        @click="cleanupDots"
                        :disabled="isCleaningUp"
                        class="px-6 py-3 bg-slate-600 hover:bg-slate-700 text-white rounded-lg font-medium transition-colors flex items-center gap-2 disabled:opacity-50"
                    >
                        <span class="text-xl">🧹</span>
                        {{ isCleaningUp ? 'Temizleniyor...' : 'Nokta Klasörlerini Temizle' }}
                    </button>

                    <button
                        @click="refreshData"
                        :disabled="isRefreshing"
                        class="px-6 py-3 bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-900 dark:text-white rounded-lg font-medium transition-colors flex items-center gap-2 disabled:opacity-50"
                    >
                        <span class="text-xl">🔄</span>
                        {{ isRefreshing ? 'Yenileniyor...' : 'Yenile' }}
                    </button>
                </div>

                <!-- Tenants Table -->
                <div class="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
                    <div class="overflow-x-auto">
                        <table class="w-full">
                            <thead class="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-700">
                                <tr>
                                    <th class="px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-white">Domain</th>
                                    <th class="px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-white">İsim</th>
                                    <th class="px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-white">Database</th>
                                    <th class="px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-white">Storage</th>
                                    <th class="px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-white">Oluşturulma</th>
                                    <th class="px-6 py-4 text-right text-sm font-semibold text-slate-900 dark:text-white">İşlemler</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-slate-200 dark:divide-slate-700">
                                <tr v-for="tenant in tenants" :key="tenant.domain" class="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                                    <td class="px-6 py-4">
                                        <a :href="`https://${tenant.domain}`" target="_blank" class="text-blue-600 dark:text-blue-400 hover:underline font-medium">
                                            {{ tenant.domain }}
                                        </a>
                                    </td>
                                    <td class="px-6 py-4 text-slate-900 dark:text-white">
                                        {{ tenant.name }}
                                    </td>
                                    <td class="px-6 py-4">
                                        <div class="text-sm">
                                            <div class="font-medium text-slate-900 dark:text-white">
                                                {{ tenant.database.size_formatted }}
                                            </div>
                                            <div class="text-slate-500 dark:text-slate-400">
                                                {{ tenant.database.tables }} tablo
                                            </div>
                                        </div>
                                    </td>
                                    <td class="px-6 py-4">
                                        <div class="text-sm">
                                            <div class="font-medium text-slate-900 dark:text-white">
                                                {{ tenant.storage.size_formatted }}
                                            </div>
                                            <div class="text-slate-500 dark:text-slate-400">
                                                {{ tenant.storage.files }} dosya
                                            </div>
                                        </div>
                                    </td>
                                    <td class="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">
                                        {{ formatDate(tenant.created_at) }}
                                    </td>
                                    <td class="px-6 py-4 text-right">
                                        <button
                                            @click="confirmDelete(tenant)"
                                            class="px-4 py-2 bg-red-100 hover:bg-red-200 dark:bg-red-900/30 dark:hover:bg-red-900/50 text-red-700 dark:text-red-400 rounded-lg text-sm font-medium transition-colors"
                                        >
                                            🗑️ Sil
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                        <div v-if="tenants.length === 0" class="text-center py-12">
                            <p class="text-slate-500 dark:text-slate-400 text-lg">
                                Henüz tenant eklenmemiş
                            </p>
                        </div>
                    </div>
                </div>


                <!-- Create Modal -->
                <div v-if="showCreateModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div class="bg-white dark:bg-slate-800 rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div class="p-6 border-b border-slate-200 dark:border-slate-700">
                            <h2 class="text-2xl font-bold text-slate-900 dark:text-white">
                                Yeni Tenant Ekle
                            </h2>
                            <p class="mt-2 text-sm text-slate-600 dark:text-slate-400">
                                Domain'i Hostinger'dan aldıktan ve park ettikten sonra buradan tenant oluşturun
                            </p>
                        </div>

                        <!-- Checklist -->
                        <div class="p-6 bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-700">
                            <h3 class="text-sm font-semibold text-slate-900 dark:text-white mb-3">
                                ✅ Kontrol Listesi (Tamamlandı mı?)
                            </h3>
                            <div class="space-y-2 text-sm">
                                <label class="flex items-center gap-3 cursor-pointer">
                                    <input type="checkbox" v-model="checklist.domainBought" class="w-4 h-4 rounded border-slate-300 dark:border-slate-600 text-blue-600 focus:ring-blue-500" />
                                    <span class="text-slate-700 dark:text-slate-300">Domain Hostinger'dan satın alındı</span>
                                </label>
                                <label class="flex items-center gap-3 cursor-pointer">
                                    <input type="checkbox" v-model="checklist.domainParked" class="w-4 h-4 rounded border-slate-300 dark:border-slate-600 text-blue-600 focus:ring-blue-500" />
                                    <span class="text-slate-700 dark:text-slate-300">Domain {{ mainDomain }}'e park edildi</span>
                                </label>
                                <label class="flex items-center gap-3 cursor-pointer">
                                    <input type="checkbox" v-model="checklist.dnsWaited" class="w-4 h-4 rounded border-slate-300 dark:border-slate-600 text-blue-600 focus:ring-blue-500" />
                                    <span class="text-slate-700 dark:text-slate-300">DNS yayılması için 5-10 dakika beklendi</span>
                                </label>
                            </div>
                            <div v-if="!allChecklistComplete" class="mt-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                                <p class="text-xs text-yellow-800 dark:text-yellow-400">
                                    ⚠️ Tüm adımları tamamlamadan tenant oluşturursanız, domain çalışmayabilir.
                                </p>
                            </div>
                        </div>

                        <form @submit.prevent="createTenant" class="p-6 space-y-6">
                            <div>
                                <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                    Domain <span class="text-red-500">*</span>
                                </label>
                                <input
                                    v-model="form.domain"
                                    type="text"
                                    placeholder="candundar.com"
                                    required
                                    class="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                                <p class="mt-2 text-sm text-slate-500 dark:text-slate-400">
                                    Örnek: candundar.com (www ve https olmadan)
                                </p>
                            </div>

                            <div class="flex items-center gap-3 p-4 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
                                <input
                                    v-model="form.copy_users"
                                    type="checkbox"
                                    id="copy_users"
                                    class="w-5 h-5 rounded border-slate-300 dark:border-slate-600 text-blue-600 focus:ring-blue-500"
                                />
                                <label for="copy_users" class="text-sm font-medium text-slate-700 dark:text-slate-300 cursor-pointer">
                                    Ana database'den user verilerini kopyala
                                </label>
                            </div>

                            <details class="border border-slate-200 dark:border-slate-700 rounded-lg">
                                <summary class="px-4 py-3 cursor-pointer font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50 rounded-lg">
                                    Gelişmiş Ayarlar (Opsiyonel)
                                </summary>
                                <div class="p-4 space-y-4 border-t border-slate-200 dark:border-slate-700">
                                    <div>
                                        <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                            Database Adı
                                        </label>
                                        <input
                                            v-model="form.db_name"
                                            type="text"
                                            placeholder="Otomatik oluşturulacak"
                                            class="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                                        />
                                    </div>

                                    <div>
                                        <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                            Database Kullanıcı
                                        </label>
                                        <input
                                            v-model="form.db_user"
                                            type="text"
                                            placeholder="Ana database kullanıcısı kullanılacak"
                                            class="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                                        />
                                    </div>

                                    <div>
                                        <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                            Database Şifre
                                        </label>
                                        <input
                                            v-model="form.db_pass"
                                            type="password"
                                            placeholder="Ana database şifresi kullanılacak"
                                            class="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                                        />
                                    </div>
                                </div>
                            </details>

                            <div v-if="createError" class="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                                <p class="text-sm text-red-700 dark:text-red-400">
                                    {{ createError }}
                                </p>
                            </div>

                            <div class="flex gap-3 pt-4">
                                <button
                                    type="submit"
                                    :disabled="isCreating"
                                    class="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {{ isCreating ? '⏳ Oluşturuluyor...' : '✅ Tenant Oluştur' }}
                                </button>
                                <button
                                    type="button"
                                    @click="showCreateModal = false"
                                    :disabled="isCreating"
                                    class="px-6 py-3 bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-900 dark:text-white rounded-lg font-medium transition-colors disabled:opacity-50"
                                >
                                    İptal
                                </button>
                            </div>
                        </form>
                    </div>
                </div>


                <!-- Delete Confirmation Modal -->
                <div v-if="showDeleteModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div class="bg-white dark:bg-slate-800 rounded-xl shadow-2xl max-w-md w-full">
                        <div class="p-6">
                            <div class="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span class="text-2xl">⚠️</span>
                            </div>
                            <h3 class="text-xl font-bold text-slate-900 dark:text-white text-center mb-2">
                                Tenant Sil
                            </h3>
                            <p class="text-slate-600 dark:text-slate-400 text-center mb-6">
                                <strong>{{ tenantToDelete?.domain }}</strong> tenant'ını silmek istediğinize emin misiniz?
                            </p>
                            <div class="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-6">
                                <p class="text-sm text-yellow-800 dark:text-yellow-400">
                                    <strong>Uyarı:</strong> .env dosyası ve storage klasörü silinecek. Database güvenlik için silinmeyecek (manuel silebilirsiniz).
                                </p>
                            </div>
                            <div class="flex gap-3">
                                <button
                                    @click="deleteTenant"
                                    :disabled="isDeleting"
                                    class="flex-1 px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50"
                                >
                                    {{ isDeleting ? '⏳ Siliniyor...' : '🗑️ Evet, Sil' }}
                                </button>
                                <button
                                    @click="showDeleteModal = false"
                                    :disabled="isDeleting"
                                    class="px-6 py-3 bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-900 dark:text-white rounded-lg font-medium transition-colors disabled:opacity-50"
                                >
                                    İptal
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </AuthenticatedLayout>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { router } from '@inertiajs/vue3';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';

interface Database {
    name: string;
    exists: boolean;
    size: number;
    size_formatted: string;
    tables: number;
}

interface Storage {
    exists: boolean;
    path?: string;
    size: number;
    size_formatted: string;
    files: number;
}

interface Tenant {
    domain: string;
    name: string;
    type: string;
    status: string;
    env_exists: boolean;
    database: Database;
    storage: Storage;
    created_at: number;
}

interface Stats {
    total_tenants: number;
    active_tenants: number;
    total_db_size: number;
    total_db_size_formatted: string;
    total_storage_size: number;
    total_storage_size_formatted: string;
    total_files: number;
    total_size: number;
    total_size_formatted: string;
}

interface Props {
    tenants: Tenant[];
    stats: Stats;
    mainDomain: string;
}

const props = defineProps<Props>();

const showCreateModal = ref(false);
const showDeleteModal = ref(false);
const isCreating = ref(false);
const isDeleting = ref(false);
const isCleaningUp = ref(false);
const isRefreshing = ref(false);
const createError = ref('');
const tenantToDelete = ref<Tenant | null>(null);

const form = ref({
    domain: '',
    copy_users: true,
    db_name: '',
    db_user: '',
    db_pass: '',
});

const checklist = ref({
    domainBought: false,
    domainParked: false,
    dnsWaited: false,
});

const allChecklistComplete = computed(() => {
    return checklist.value.domainBought && 
           checklist.value.domainParked && 
           checklist.value.dnsWaited;
});


const createTenant = async () => {
    if (!form.value.domain) {
        createError.value = 'Domain alanı zorunludur';
        return;
    }

    isCreating.value = true;
    createError.value = '';

    try {
        const response = await fetch('/tenants', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
            },
            body: JSON.stringify(form.value),
        });

        const data = await response.json();

        if (data.success) {
            showCreateModal.value = false;
            form.value = {
                domain: '',
                copy_users: true,
                db_name: '',
                db_user: '',
                db_pass: '',
            };
            
            // Refresh page
            router.reload();
        } else {
            createError.value = data.message || 'Tenant oluşturulamadı';
        }
    } catch (error) {
        createError.value = 'Bir hata oluştu: ' + error;
    } finally {
        isCreating.value = false;
    }
};

const confirmDelete = (tenant: Tenant) => {
    tenantToDelete.value = tenant;
    showDeleteModal.value = true;
};

const deleteTenant = async () => {
    if (!tenantToDelete.value) return;

    isDeleting.value = true;

    try {
        const response = await fetch(`/tenants/${tenantToDelete.value.domain}`, {
            method: 'DELETE',
            headers: {
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
            },
        });

        const data = await response.json();

        if (data.success) {
            showDeleteModal.value = false;
            tenantToDelete.value = null;
            
            // Refresh page
            router.reload();
        } else {
            alert('Hata: ' + data.message);
        }
    } catch (error) {
        alert('Bir hata oluştu: ' + error);
    } finally {
        isDeleting.value = false;
    }
};

const cleanupDots = async () => {
    if (!confirm('Boş nokta klasörlerini temizlemek istediğinize emin misiniz?')) {
        return;
    }

    isCleaningUp.value = true;

    try {
        const response = await fetch('/tenants/cleanup-dots', {
            method: 'POST',
            headers: {
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
            },
        });

        const data = await response.json();

        if (data.success) {
            alert('✅ Temizlik tamamlandı!');
            router.reload();
        } else {
            alert('Hata: ' + data.message);
        }
    } catch (error) {
        alert('Bir hata oluştu: ' + error);
    } finally {
        isCleaningUp.value = false;
    }
};

const refreshData = () => {
    isRefreshing.value = true;
    router.reload({
        onFinish: () => {
            isRefreshing.value = false;
        },
    });
};

const formatDate = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString('tr-TR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
};
</script>

