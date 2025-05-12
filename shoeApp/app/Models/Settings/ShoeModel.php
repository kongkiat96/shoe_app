<?php

namespace App\Models\Settings;

use App\Models\Master\MasterModel;
use Carbon\Carbon;
use Exception;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class ShoeModel extends Model
{
    private $userMaster;

    public function __construct()
    {
        $this->userMaster = new MasterModel();
    }
    protected $table = 'shoes';
    protected $fillable = [
        'id',
        'name',
        'shoe_type_id',
        'description',
        'image',
        'status',
        'created_at',
        'created_user',
        'updated_at',
        'updated_user',
        'deleted',
    ];

    public function getDataShoeBrand($params)
    {
        try {
            $sql = ShoeModel::select('shoes.*', 'shoe_types.name as shoe_type_name')->where('shoes.deleted', 0)->leftJoin('shoe_types', 'shoes.shoe_type_id', '=', 'shoe_types.id');
            if ($params['start'] == 0) {
                $sql = $sql->orderBy('shoes.shoe_type_id')
                    ->orderBy('shoes.created_at', 'desc')
                    ->limit($params['length'])
                    ->get();
            } else {
                $sql = $sql->orderBy('shoes.shoe_type_id')
                    ->orderBy('shoes.created_at', 'desc')
                    ->offset($params['start'])
                    ->limit($params['length'])
                    ->get();
            }

            // $sql = $sql->orderBy('shoes.created_at', 'desc');
            $dataCount = $sql->count();
            // dd($sql);
            $newArr = [];
            foreach ($sql as $key => $value) {
                $newArr[] = [
                    'id' =>  encrypt($value->id),
                    'name' => $value->name,
                    'image' => $value->image,
                    'shoe_type_name' => $value->shoe_type_name,
                    'description' => $value->description,
                    'status'    => $value->status,
                    'created_user' => $value->created_user != 'system' ? $this->userMaster->getNameUserOnlyCenter($value->created_user) : $value->created_user,
                    'updated_user' => $value->updated_user != 'system' ? $this->userMaster->getNameUserOnlyCenter($value->updated_user) : $value->updated_user,
                    'created_at' => Carbon::parse($value->created_at)->format('d-m-Y H:i:s'),
                    'updated_at' => Carbon::parse($value->updated_at)->format('d-m-Y H:i:s'),
                ];
            }
            $returnData = [
                "status" => 200,
                "message"   => 'Data Return Successfully',
                "recordsTotal" => $dataCount,
                "recordsFiltered" => $dataCount,
                "data" => $newArr,
            ];
            // dd($returnData);
        } catch (Exception $e) {
            Log::error('status Code : ' . $e->getCode() . ' Message : ' . $e->getMessage());
            $returnData = [
                "status" => $e->getCode(),
                "message" => $e->getMessage(),
                "recordsTotal" => 0,
                "recordsFiltered" => 0,
                "data" => [],
            ];
        } finally {
            return $returnData;
        }
    }
    public function saveShoe($request)
    {
        DB::beginTransaction();
        try {
            $shoeData = $request->input('shoeType');
            $files = $request->allFiles(); // ใช้เพื่อรองรับ array ซ้อน

            foreach ($shoeData as $index => $group) {
                $shoeTypeID = $group['shoe_type_id'];
                // dd($group);
                foreach ($group['shoe'] as $i => $item) {
                    $name = $item['name'] ?? null;
                    $description = $item['description'] ?? null;
                    $imagePath = null;

                    // จัดการรูปภาพ
                    if (isset($files['shoeType'][$index]['shoe'][$i]['image'])) {
                        $image = $files['shoeType'][$index]['shoe'][$i]['image'];
                        // if ($image && $image->isValid()) {
                        $imageName = uniqid() . '.' . $image->getClientOriginalExtension();
                        $imagePath = $image->storeAs('/shoesIMG', $imageName);
                        // }
                    }
                    // dd($imageName);
                    self::create([
                        'name'           => $name,
                        'description'    => $description,
                        'image'          => $imageName,
                        'shoe_type_id'   => $shoeTypeID,
                        'created_user'   => Auth::id(),
                        'updated_user'   => Auth::id(),
                        'created_at'     => Carbon::now(),
                        'updated_at'     => Carbon::now(),
                        'deleted'        => 0,
                    ]);
                }
            }

            DB::commit();
            return [
                'status' => 200,
                'message' => 'Data Saved Successfully',
            ];
        } catch (Exception $e) {
            DB::rollBack();
            Log::error('Save Shoe Error: ' . $e->getMessage());
            return [
                'status' => $e->getCode() ?: 500,
                'message' => 'เกิดข้อผิดพลาด: ' . $e->getMessage(),
            ];
        }
    }

    public function editShoe($params, $shoeID)
    {
        DB::beginTransaction();
        try {
            $shoeID = decrypt($shoeID);
            $shoe = ShoeModel::findOrFail($shoeID);
            $shoe->shoe_type_id = $params['shoe_type_id'] ?? $shoe->shoe_type_id;
            $shoe->name = $params['name'] ?? $shoe->name;
            $shoe->description = $params['description'] ?? $shoe->description;

            // ตรวจสอบว่าอัปโหลดรูปภาพมาหรือไม่
            if (request()->hasFile('image')) {
                $image = request()->file('image');
                if ($image && $image->isValid()) {
                    $imageName = uniqid() . '.' . $image->getClientOriginalExtension();
                    $imagePath = $image->storeAs('shoesIMG', $imageName);

                    $shoe->image = $imageName;
                }
            }

            $shoe->updated_user = Auth::id();
            $shoe->updated_at = Carbon::now();
            $shoe->save();

            DB::commit();
            return [
                'status' => 200,
                'message' => 'แก้ไขข้อมูลสำเร็จ',
            ];
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Edit Shoe Error: ' . $e->getMessage());
            return [
                'status' => $e->getCode() ?: 500,
                'message' => $e->getMessage(),
            ];
        }
    }

    public function shoeUpdateStatus($params)
    {
        DB::beginTransaction();
        try {
            $shoeID = decrypt($params['id']);
            $shoe = ShoeModel::find($shoeID);
            if ($shoe) {
                $params['updated_at'] = Carbon::now();
                $params['updated_user'] = Auth::id();
                unset($params['id']);
                $shoe->update([
                    'status' => $params['status'],
                    'updated_at' => $params['updated_at'],
                    'updated_user' => $params['updated_user'],
                ]);
                $returnData = [
                    "status" => 200,
                    "message" => 'Data Updated Successfully',
                ];
                DB::commit();
            } else {
                $returnData = [
                    "status" => 404,
                    "message" => 'Data Not Found',
                ];
            }
        } catch (Exception $e) {
            DB::rollBack();
            Log::error('status Code : ' . $e->getCode() . ' Message : ' . $e->getMessage());
            $returnData = [
                "status" => $e->getCode(),
                "message" => $e->getMessage(),
            ];
        } finally {
            return $returnData;
        }
    }

    public function shoeDelete($shoeID)
    {
        DB::beginTransaction();
        try {
            $shoeID = decrypt($shoeID);
            $shoe = ShoeModel::find($shoeID);
            if ($shoe) {
                $shoe->update([
                    'deleted' => 1,
                    'status' => 'inactive',
                    'updated_at' => Carbon::now(),
                    'updated_user' => Auth::id()
                ]);
                $returnData = [
                    "status" => 200,
                    "message" => 'Data Deleted Successfully',
                ];
                DB::commit();
            } else {
                $returnData = [
                    "status" => 404,
                    "message" => 'Data Not Found',
                ];
            }
        } catch (Exception $e) {
            DB::rollBack();
            Log::error('status Code : ' . $e->getCode() . ' Message : ' . $e->getMessage());
            $returnData = [
                "status" => $e->getCode(),
                "message" => $e->getMessage(),
            ];
        } finally {
            return $returnData;
        }
    }
}
