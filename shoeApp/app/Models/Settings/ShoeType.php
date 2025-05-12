<?php

namespace App\Models\Settings;

use App\Models\Master\MasterModel;
use App\Models\User;
use Carbon\Carbon;
use Exception;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class ShoeType extends Model
{
    private $userMaster;

    public function __construct()
    {
        $this->userMaster = new MasterModel();
    }
    protected $fillable = [
        'id',
        'name',
        'description',
        'status',
        'created_at',
        'created_user',
        'updated_at',
        'updated_user',
        'deleted',
    ];

    public function getDataShoeType($params)
    {
        try {
            $sql = ShoeType::select('shoe_types.*')->where('shoe_types.deleted', 0);
            if ($params['start'] == 0) {
                $sql = $sql->limit($params['length'])->orderBy('created_at', 'desc')->get();
            } else {
                $sql = $sql->offset($params['start'])
                    ->limit($params['length'])
                    ->orderBy('created_at', 'desc')->get();
            }
            // $sql = $sql->orderBy('created_at', 'desc');
            $dataCount = $sql->count();
            $newArr = [];
            foreach ($sql as $key => $value) {
                $newArr[] = [
                    'id' =>  encrypt($value->id),
                    'name' => $value->name,
                    'description' => $value->description,
                    'status'    => $value->status,
                    'created_user' => $value->created_user != 'system' ? $this->userMaster->getNameUserOnlyCenter($value->created_user) : $value->created_user,
                    'updated_user' => $value->updated_user != 'system' ? $this->userMaster->getNameUserOnlyCenter($value->updated_user) : $value->updated_user,
                    'created_at' => Carbon::parse($value->created_at)->format('d-m-Y H:i:s'),
                    'updated_at' => Carbon::parse($value->updated_at)->format('d-m-Y H:i:s'),
                ];
            }
            // dd($newArr);
            $returnData = [
                "status" => 200,
                "message"   => 'Data Return Successfully',
                "recordsTotal" => $dataCount,
                "recordsFiltered" => $dataCount,
                "data" => $newArr,
            ];
        } catch (Exception $e) {
            Log::error('status Code : ' . $e->getCode() . ' Message : ' . $e->getMessage());
            $returnData = [
                "status" => $e->getCode(),
                "message"   => $e->getMessage(),
                "recordsTotal" => 0,
                "recordsFiltered" => 0,
                "data" => [],
            ];
        } finally {
            return $returnData;
        }
    }

    public function editShoeType($params, $shoeTypeID)
    {
        DB::beginTransaction();
        try {
            // dd($params);
            $decryptID = decrypt($shoeTypeID);
            $shoeType = ShoeType::find($decryptID);
            if ($shoeType) {
                $params['updated_at'] = Carbon::now();
                $params['updated_user'] = Auth::id();
                $shoeType->update($params);
                $returnData = [
                    "status" => 200,
                    "message" => 'Data Updated Successfully',
                ];
            } else {
                $returnData = [
                    "status" => 404,
                    "message" => 'Data Not Found',
                ];
            }
            DB::commit();
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

    public function shoeTypeUpdateStatus($params)
    {
        try {
            // dd($params);
            $decryptID = decrypt($params['id']);
            $shoeType = ShoeType::find($decryptID);
            if ($shoeType) {
                $params['updated_at'] = Carbon::now();
                $params['updated_user'] = Auth::id();
                unset($params['id']);
                $shoeType->update([
                    'status' => $params['status'],
                    'updated_at' => $params['updated_at'],
                    'updated_user' => $params['updated_user'],
                ]);
                $returnData = [
                    "status" => 200,
                    "message" => 'Data Updated Successfully',
                ];
            } else {
                $returnData = [
                    "status" => 404,
                    "message" => 'Data Not Found',
                ];
            }
            // dd($returnData);
        } catch (Exception $e) {
            Log::error('status Code : ' . $e->getCode() . ' Message : ' . $e->getMessage());
            $returnData = [
                "status" => $e->getCode(),
                "message" => $e->getMessage(),
            ];
        } finally {
            return $returnData;
        }
    }

    public function shoeTypeDelete($shoeTypeID)
    {
        try {
            $decryptID = decrypt($shoeTypeID);
            $shoeType = ShoeType::find($decryptID);
            // dd($shoeType);
            if ($shoeType) {
                $shoeType->update([
                    'deleted' => 1,
                    'status' => 'inactive',
                    'updated_at' => Carbon::now(),
                    'updated_user' => Auth::id()
                ]);
                $returnData = [
                    "status" => 200,
                    "message" => 'Data Deleted Successfully',
                ];
            } else {
                $returnData = [
                    "status" => 404,
                    "message" => 'Data Not Found',
                ];
            }
        } catch (Exception $e) {
            Log::error('status Code : ' . $e->getCode() . ' Message : ' . $e->getMessage());
            $returnData = [
                "status" => $e->getCode(),
                "message" => $e->getMessage(),
            ];
        } finally {
            return $returnData;
        }
    }

    public function saveShoeType($params)
    {
        try {
            $params['created_at'] = Carbon::now();
            $params['created_user'] = Auth::id();
            $params['updated_at'] = Carbon::now();
            $params['updated_user'] = Auth::id();
            $shoeType = ShoeType::create($params);
            $returnData = [
                "status" => 200,
                "message" => 'Data Saved Successfully',
            ];
        } catch (Exception $e) {
            Log::error('status Code : ' . $e->getCode() . ' Message : ' . $e->getMessage());
            $returnData = [
                "status" => $e->getCode(),
                "message" => $e->getMessage(),
            ];
        } finally {
            return $returnData;
        }
    }

    public function users()
    {
        return $this->belongsToMany(User::class, 'user_shoe_type');
    }
}
