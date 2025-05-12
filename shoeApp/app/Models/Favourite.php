<?php

namespace App\Models;

use Exception;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class Favourite extends Model
{
    protected $fillable = ['user_id', 'shoe_id'];

    public function getFavourites($type)
    {
        try {

            $getData = DB::table('favourites')
                ->join('shoes', 'shoes.id', '=', 'favourites.shoe_id')
                ->join('shoe_types', 'shoe_types.id', '=', 'shoes.shoe_type_id')
                ->join('users', 'users.id', '=', 'favourites.user_id')
                ->select('favourites.*', 'shoes.id', 'shoes.name as shoe_name', 'shoes.image as shoe_image', 'shoes.description', 'shoe_types.name as shoe_type_name','users.name as user_name');
            if ($type == 'all') {
                $getData = $getData->whereNotNull('favourites.user_id');
            } else {
                $getData = $getData->where('favourites.user_id', Auth::id());
            }
            $getData = $getData->orderBy('favourites.created_at', 'desc')->get();

            return $getData;
        } catch (Exception $e) {
            Log::error('status Code: ' . $e->getCode() . ' Message: ' . $e->getMessage());
            return true;
        }
    }
}
