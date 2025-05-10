<?php

namespace Database\Seeders;

use App\Models\Settings\shoeType;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ShoeTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $types = [
            ['name' => 'รองเท้าวิ่ง', 'description' => 'เหมาะสำหรับการวิ่งทุกประเภท','created_user' => 'system', 'updated_user' => 'system'],
            ['name' => 'รองเท้าบาสเกตบอล', 'description' => 'สำหรับการเล่นบาสเกตบอลโดยเฉพาะ','created_user' => 'system', 'updated_user' => 'system'],
            ['name' => 'รองเท้าฟุตบอล', 'description' => 'รองเท้าสตั๊ดสำหรับสนามหญ้า','created_user' => 'system', 'updated_user' => 'system'],
            ['name' => 'รองเท้าเทรนนิ่ง', 'description' => 'ใช้ในการฝึกซ้อมหรือเล่นฟิตเนส','created_user' => 'system', 'updated_user' => 'system'],
            ['name' => 'รองเท้าแฟชั่น', 'description' => 'เน้นความสวยงามในการแต่งตัวทั่วไป','created_user' => 'system', 'updated_user' => 'system'],
        ];

        foreach ($types as $type) {
            ShoeType::updateOrCreate($type);
        }
    }
}
