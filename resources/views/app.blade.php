<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title inertia>{{ config('app.name') }}</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.css" />
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Geist+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet">

    <link rel="icon" href="{{ $page['props']['screen']['seo']['logo'] ?? '/favicon.ico' }}" />

    <!-- Theme initialization script -->
    <script>
        // Mevcut tema ayarını localStorage'dan al veya varsayılan olarak 'light' kullan
        const savedTheme = localStorage.getItem('theme') || 'light';
        
        // Tema özniteliğini ayarla (DaisyUI için)
        document.documentElement.setAttribute('data-theme', savedTheme);
        
        // Tema sınıfını ekle (CSS seçicileri için)
        document.documentElement.classList.add(savedTheme);
        
        // Dark tema için özel sınıf (Tailwind için)
        if (savedTheme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
            </script>

    @routes
    @vite(['resources/js/app.ts', 'resources/css/app.css', "resources/js/Pages/{$page['component']}.vue"])
    @inertiaHead
</head>

<body>
    @inertia
</body>

</html>
