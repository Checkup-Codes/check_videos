<?php

namespace Database\Seeders;

use App\Models\Projects\Customer;
use App\Models\Projects\Service;
use App\Models\Projects\Project;
use App\Models\Projects\ProjectServiceTodo;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
use Faker\Factory as Faker;

class ProjectsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create('tr_TR');

        // Create 3 customers
        $customers = Customer::factory()->count(3)->create();

        // Create 3 services
        $services = collect([
            Service::create([
                'name' => 'Web Sitesi Geliştirme',
                'slug' => 'web-sitesi-gelistirme',
                'description' => 'Modern ve responsive web siteleri geliştirme hizmeti',
                'price' => 5000.00,
            ]),
            Service::create([
                'name' => 'Mobil Uygulama Geliştirme',
                'slug' => 'mobil-uygulama-gelistirme',
                'description' => 'iOS ve Android platformları için mobil uygulama geliştirme',
                'price' => 15000.00,
            ]),
            Service::create([
                'name' => 'E-Ticaret Platformu',
                'slug' => 'e-ticaret-platformu',
                'description' => 'Tam özellikli e-ticaret platformu geliştirme ve entegrasyon',
                'price' => 25000.00,
            ]),
        ]);

        // Create 3 projects with relationships
        foreach ($customers as $index => $customer) {
            $project = Project::factory()->create([
                'project_name' => [
                    'E-Ticaret Platformu Projesi',
                    'Kurumsal Web Sitesi Projesi',
                    'Mobil Uygulama Projesi',
                ][$index],
                'customer_id' => $customer->id,
            ]);

            // Attach services to project with pivot data
            $selectedServices = $services->random(rand(1, 3));
            
            foreach ($selectedServices as $service) {
                $project->services()->attach($service->id, [
                    'price' => $service->price + rand(-1000, 2000), // Vary the price
                    'status' => ['pending', 'active', 'completed'][rand(0, 2)],
                    'payment_status' => ['unpaid', 'partial', 'paid'][rand(0, 2)],
                    'notes' => $faker->sentence(),
                    'service_start_date' => now()->subDays(rand(10, 60)),
                    'service_end_date' => now()->addDays(rand(30, 120)),
                ]);

                // Create todos for each service
                $todoCount = rand(3, 8);
                for ($i = 0; $i < $todoCount; $i++) {
                    $isCompleted = rand(0, 1);
                    ProjectServiceTodo::create([
                        'project_id' => $project->id,
                        'service_id' => $service->id,
                        'title' => [
                            'Tasarım mockupları hazırla',
                            'Backend API geliştir',
                            'Frontend entegrasyonu yap',
                            'Test senaryoları yaz',
                            'Deployment hazırlığı',
                            'Dokümantasyon oluştur',
                            'Code review yap',
                            'Performans optimizasyonu',
                        ][$i % 8],
                        'is_completed' => $isCompleted,
                        'completed_at' => $isCompleted ? now()->subDays(rand(1, 30)) : null,
                    ]);
                }
            }
        }

        $this->command->info('3 müşteri, 3 servis ve 3 proje oluşturuldu!');
    }
}
