<?php

namespace App\Models\Master;

use App\Models\User;
use Exception;
use Illuminate\Database\Eloquent\Model;
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
}
