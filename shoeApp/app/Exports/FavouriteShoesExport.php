<?php

namespace App\Exports;

use App\Models\Favourite;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\WithDrawings;
use Maatwebsite\Excel\Concerns\WithEvents;
use PhpOffice\PhpSpreadsheet\Worksheet\Drawing;
use Maatwebsite\Excel\Events\AfterSheet;

class FavouriteShoesExport implements FromCollection, WithHeadings, WithMapping, WithDrawings, WithEvents
{
    use Exportable;

    private $favourites;
    private $type;

    public function __construct($type = null)
    {
        $this->type = $type;
        $this->favourites = new Favourite();
    }

    public function collection()
    {
        $favourites = $this->favourites->getFavourites($this->type);
        // dd($favourites);
        return $favourites;
    }

    public function headings(): array
    {
        return [
            'ประเภทรองเท้า',
            'ชื่อรองเท้า',
            'รายละเอียด',
            'รูปภาพ',
            'ชื่อผู้ที่สนใจ',
        ];
    }

    public function map($row): array
    {
        return [
            $row->shoe_type_name,
            $row->shoe_name,
            $row->description,
            '',
            $row->user_name,
        ];
    }

    public function drawings()
    {
        $drawings = [];
        foreach ($this->collection() as $index => $item) {
            $imagePath = storage_path('app/public/shoesIMG/' . $item->shoe_image);
            if (file_exists($imagePath)) {
                $drawing = new Drawing();
                $drawing->setName('Shoe Image');
                $drawing->setDescription('Image');
                $drawing->setPath($imagePath);
                $drawing->setHeight(60);
                $drawing->setCoordinates('D' . ($index + 2));
                $drawings[] = $drawing;
            }
        }

        return $drawings;
    }

    public function registerEvents(): array
    {
        return [
            AfterSheet::class => function (AfterSheet $event) {
                $sheet = $event->sheet->getDelegate();
                $collection = $this->collection();
                $rowCount = $collection->count() + 1; // +1 เพราะมี header

                foreach ($collection as $index => $item) {
                    $row = $index + 2;
                    $sheet->getRowDimension($row)->setRowHeight(50);
                }

                $sheet->getStyle('A1:E1')->applyFromArray([
                    'font' => [
                        'bold' => true,
                        'size' => 13,
                        'color' => ['rgb' => 'FFFFFF'],
                    ],
                    'fill' => [
                        'fillType' => \PhpOffice\PhpSpreadsheet\Style\Fill::FILL_SOLID,
                        'startColor' => ['rgb' => '4F81BD'], // ฟ้าเข้ม
                    ],
                    'alignment' => [
                        'horizontal' => \PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_CENTER,
                        'vertical'   => \PhpOffice\PhpSpreadsheet\Style\Alignment::VERTICAL_CENTER,
                    ],
                    'borders' => [
                        'allBorders' => [
                            'borderStyle' => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_THIN,
                            'color' => ['rgb' => '000000'],
                        ],
                    ],
                ]);

                foreach (range('A', 'E') as $col) {
                    $sheet->getColumnDimension($col)->setAutoSize(true);
                }

                $sheet->setAutoFilter("A1:E{$rowCount}");
            },
        ];
    }
}
