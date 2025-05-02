# WritesCategories Services

Bu klasör, yazılar ve kategoriler için oluşturulmuş veri erişim servislerini içerir.

## Servisler

### WriteService

`WriteService` yazılarla ilgili tüm veri işlemlerini yönetir:

- Tüm yazıları getirme
- Kategoriye göre yazıları filtreleme
- Yazı işlemleri (ekleme, güncelleme, silme)
- Çizim işlemleri (ekleme, silme)
- Cache yönetimi

### CategoryService

`CategoryService` kategorilerle ilgili tüm veri işlemlerini yönetir:

- Kategori listeleme
- Kategori işlemleri (ekleme, güncelleme, silme)
- Cache yönetimi

## Kullanım

Servislere bağımlılık enjeksiyonu (dependency injection) ile erişilebilir:

```php
use App\Services\WritesCategories\WriteService;
use App\Services\WritesCategories\CategoryService;

class ExampleController extends Controller
{
    private $writeService;
    private $categoryService;

    public function __construct(WriteService $writeService, CategoryService $categoryService)
    {
        $this->writeService = $writeService;
        $this->categoryService = $categoryService;
    }

    public function index()
    {
        $categories = $this->categoryService->getCategories();
        $writes = $this->writeService->getWrites();
        
        // ...
    }
}
``` 