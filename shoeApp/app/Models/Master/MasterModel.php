<?php

namespace App\Models\Master;

use App\Models\Settings\ShoeModel;
use App\Models\Settings\ShoeType;
use App\Models\User;
use Exception;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class MasterModel extends Model
{
    public function getNameUserOnlyCenter($userID)
    {
        try {
            $searchUser = User::where('id', $userID)->first();

            return $searchUser->name;
        } catch (Exception $e) {
            Log::error('status Code: ' . $e->getCode() . ' Message: ' . $e->getMessage());
            return true;
        }
    }

    public function getDataShoeType()
    {
        try {
            $getDataShoeType = ShoeType::select('shoe_types.id', 'shoe_types.name')->where('shoe_types.deleted', 0)->where('shoe_types.status', 'active')->orderBy('shoe_types.created_at', 'desc')->get();

            return $getDataShoeType;
        } catch (Exception $e) {
            Log::error('status Code: ' . $e->getCode() . ' Message: ' . $e->getMessage());
            return true;
        }
    }

    public function getDataShoe()
    {
        try {
            $getDataShoe = ShoeModel::select('shoes.id', 'shoes.name')
                ->leftJoin('shoe_types', 'shoes.shoe_type_id', '=', 'shoe_types.id')
                ->where('shoes.deleted', 0)
                ->where('shoes.status', 'active')
                ->select('shoes.*', 'shoe_types.name as shoe_type_name', 'shoe_types.id as shoe_type_id_master')
                ->orderBy('shoes.created_at', 'desc')->get();

            return $getDataShoe;
        } catch (Exception $e) {
            Log::error('status Code: ' . $e->getCode() . ' Message: ' . $e->getMessage());
            return true;
        }
    }

    public function getShoeTypeFavorite()
    {
        try {
            $getDataShoeType = DB::table('user_shoe_type')
                ->join('shoe_types', 'shoe_types.id', '=', 'user_shoe_type.shoe_type_id')
                ->where('user_shoe_type.user_id', Auth::id())
                ->select('user_shoe_type.*', 'shoe_types.name as shoe_type_name')
                ->get();

            return $getDataShoeType;
        } catch (Exception $e) {
            Log::error('status Code: ' . $e->getCode() . ' Message: ' . $e->getMessage());
            return true;
        }
    }
}
