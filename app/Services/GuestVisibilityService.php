<?php

namespace App\Services;

use App\Models\GuestVisibilitySetting;
use App\Support\TenantDomain;
use Illuminate\Support\Facades\Auth;

class GuestVisibilityService
{
    /** Modüller ziyaretçilere asla açılmaz */
    public const LOCKED_MODULES = ['customers', 'versions'];

    /** config/domains.php hidden_features anahtarları */
    public const DOMAIN_FEATURE_MAP = [
        'tests' => 'tests',
        'words' => 'words',
        'services' => 'services',
        'projects' => 'projects',
        'certificates' => 'certificates',
        'bookmarks' => 'bookmarks',
        'workspace' => 'workspaces',
        'customers' => 'customers',
        'versions' => 'versions',
    ];

    public function settings(): GuestVisibilitySetting
    {
        return GuestVisibilitySetting::current();
    }

    /**
     * @return array<string, bool>
     */
    public function forFrontend(): array
    {
        $settings = $this->settings();

        return [
            'tests' => (bool) $settings->tests,
            'words' => (bool) $settings->words,
            'services' => (bool) $settings->services,
            'projects' => (bool) $settings->projects,
            'certificates' => (bool) $settings->certificates,
            'bookmarks' => (bool) $settings->bookmarks,
            'workspace' => (bool) $settings->workspace,
            'customers' => false,
            'versions' => false,
        ];
    }

    public function isHiddenByDomain(string $module): bool
    {
        $feature = self::DOMAIN_FEATURE_MAP[$module] ?? $module;

        return TenantDomain::isFeatureHidden(TenantDomain::current(), $feature);
    }

    public function canGuestAccess(string $module): bool
    {
        if (in_array($module, self::LOCKED_MODULES, true)) {
            return false;
        }

        if ($this->isHiddenByDomain($module)) {
            return false;
        }

        $settings = $this->settings();
        $column = in_array($module, self::LOCKED_MODULES, true) ? null : $module;

        if (!$column || !in_array($column, $settings->getFillable(), true)) {
            return false;
        }

        return (bool) $settings->{$column};
    }

    public function canAccess(string $module): bool
    {
        if (Auth::check()) {
            return !$this->isHiddenByDomain($module);
        }

        return $this->canGuestAccess($module);
    }

    /**
     * @param  array<string, bool>  $input
     */
    public function update(array $input): GuestVisibilitySetting
    {
        $settings = $this->settings();
        $allowed = array_intersect_key(
            $input,
            array_flip($settings->getFillable())
        );

        $settings->update($allowed);

        return $settings->fresh();
    }

    /**
     * @return list<array{key: string, label: string, description: string, locked: bool}>
     */
    public function moduleDefinitions(): array
    {
        return [
            [
                'key' => 'tests',
                'label' => 'Testler',
                'description' => 'Yayındaki testler sidebar ve liste sayfalarında görünür.',
                'locked' => false,
            ],
            [
                'key' => 'words',
                'label' => 'Kelimeler',
                'description' => 'Kelime paketleri ve oyun modları ziyaretçilere açılır.',
                'locked' => false,
            ],
            [
                'key' => 'services',
                'label' => 'Hizmetler',
                'description' => 'Hizmet listesi ve detay sayfaları görüntülenebilir.',
                'locked' => false,
            ],
            [
                'key' => 'projects',
                'label' => 'Projeler',
                'description' => 'Projeler listelenebilir; müşteri ve ödeme bilgileri gizlenir.',
                'locked' => false,
            ],
            [
                'key' => 'certificates',
                'label' => 'Sertifikalar',
                'description' => 'Yayındaki sertifikalar ziyaretçilere gösterilir.',
                'locked' => false,
            ],
            [
                'key' => 'bookmarks',
                'label' => 'Yer İmleri',
                'description' => 'Yer imi koleksiyonları görüntülenebilir.',
                'locked' => false,
            ],
            [
                'key' => 'workspace',
                'label' => 'Çalışma Alanım',
                'description' => 'Yayındaki çalışma alanları görüntülenebilir.',
                'locked' => false,
            ],
            [
                'key' => 'customers',
                'label' => 'Müşteriler',
                'description' => 'Güvenlik nedeniyle ziyaretçilere hiç açılmaz.',
                'locked' => true,
            ],
            [
                'key' => 'versions',
                'label' => 'Versiyonlar',
                'description' => 'Sadece giriş yapmış kullanıcılar görebilir.',
                'locked' => true,
            ],
        ];
    }
}
