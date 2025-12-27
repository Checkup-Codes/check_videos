<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">

    <title inertia>{{ config('app.name') }}</title>
    <meta name="csrf-token" content="{{ csrf_token() }}">
    
    @php
        $seoService = app(\App\Services\SeoService::class);
        $meta = $seoService->getFullMeta();
    @endphp

    <!-- Primary Meta Tags -->
    <meta name="description" content="{{ $meta['description'] }}">
    <meta name="keywords" content="{{ $meta['keywords'] }}">
    <meta name="author" content="{{ $meta['author'] }}">
    <meta name="robots" content="{{ $meta['robots'] }}">
    <meta name="language" content="{{ $meta['language'] }}">

    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="{{ $meta['og']['type'] }}">
    <meta property="og:locale" content="{{ $meta['og']['locale'] }}">
    <meta property="og:site_name" content="{{ $meta['og']['site_name'] }}">
    <meta property="og:title" content="{{ $meta['og']['title'] }}">
    <meta property="og:description" content="{{ $meta['og']['description'] }}">
    @if($meta['og']['image'])
    <meta property="og:image" content="{{ $meta['og']['image'] }}">
    @endif

    <!-- Twitter -->
    <meta name="twitter:card" content="{{ $meta['twitter']['card'] }}">
    @if($meta['twitter']['site'])
    <meta name="twitter:site" content="{{ $meta['twitter']['site'] }}">
    @endif
    @if($meta['twitter']['creator'])
    <meta name="twitter:creator" content="{{ $meta['twitter']['creator'] }}">
    @endif
    <meta name="twitter:title" content="{{ $meta['twitter']['title'] }}">
    <meta name="twitter:description" content="{{ $meta['twitter']['description'] }}">
    @if($meta['twitter']['image'])
    <meta name="twitter:image" content="{{ $meta['twitter']['image'] }}">
    @endif

    <!-- Favicon & Icons -->
    <link rel="icon" href="{{ $meta['favicon'] }}" />
    @if($meta['appleTouchIcon'])
    <link rel="apple-touch-icon" href="{{ $meta['appleTouchIcon'] }}">
    @endif
    <meta name="theme-color" content="{{ $meta['themeColor'] }}">

    <!-- Search Engine Verification -->
    @if($meta['verification']['google'])
    <meta name="google-site-verification" content="{{ $meta['verification']['google'] }}">
    @endif
    @if($meta['verification']['bing'])
    <meta name="msvalidate.01" content="{{ $meta['verification']['bing'] }}">
    @endif
    @if($meta['verification']['yandex'])
    <meta name="yandex-verification" content="{{ $meta['verification']['yandex'] }}">
    @endif

    <!-- Google Analytics -->
    @if($meta['analytics']['googleAnalyticsId'])
    <script async src="https://www.googletagmanager.com/gtag/js?id={{ $meta['analytics']['googleAnalyticsId'] }}"></script>
    <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '{{ $meta['analytics']['googleAnalyticsId'] }}');
    </script>
    @endif

    <!-- Google Tag Manager -->
    @if($meta['analytics']['googleTagManagerId'])
    <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','{{ $meta['analytics']['googleTagManagerId'] }}');</script>
    @endif

    <!-- Schema.org JSON-LD -->
    @if($meta['schemaOrg'])
    <script type="application/ld+json">
        {!! json_encode($meta['schemaOrg']) !!}
    </script>
    @endif

    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.css" />
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Geist+Sans:wght@300;400;500;600;700&family=Cinzel:wght@400;500;600;700&display=swap" rel="stylesheet">

    <!-- Theme initialization script - Shadcn compatible -->
    <script>
        // Mevcut tema ayarını localStorage'dan al veya varsayılan olarak 'light' kullan
        const savedTheme = localStorage.getItem('theme') || 'light';
        
        // Shadcn dark mode için .dark class'ı ekle/kaldır
        if (savedTheme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        
        // FOUC (Flash of Unstyled Content) önlemek için arka plan rengini hemen ayarla
        document.documentElement.style.backgroundColor = savedTheme === 'dark' 
            ? 'hsl(0, 0%, 3.9%)' 
            : 'hsl(0, 0%, 100%)';
    </script>

    @routes
    @vite(['resources/js/app.ts', 'resources/css/app.css', "resources/js/Pages/{$page['component']}.vue"])
    @inertiaHead
</head>

<body>
    @if($meta['analytics']['googleTagManagerId'])
    <!-- Google Tag Manager (noscript) -->
    <noscript><iframe src="https://www.googletagmanager.com/ns.html?id={{ $meta['analytics']['googleTagManagerId'] }}"
    height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
    @endif
    
    @inertia
</body>

</html>
