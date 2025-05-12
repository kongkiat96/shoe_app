<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Master\MasterModel;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\View\View;
use Illuminate\Support\Facades\Validator;

class RegisteredUserController extends Controller
{
    private $functionMaster;

    public function __construct()
    {
        $this->functionMaster = new MasterModel();
    }
    /**
     * Display the registration view.
     */
    public function create(): View
    {
        $masterShoeType = $this->functionMaster->getDataShoeType();
        $dataShoe = $this->functionMaster->getDataShoe();
        return view('auth.register', [
            'masterShoeType' => $masterShoeType,
            'dataShoes' => $dataShoe
        ]);
    }

    public function saveRegister(Request $request)
    {
        $setReqInput = $request->all();

        if (!empty($setReqInput['lastName'])) {
            $setReqInput['name'] = $setReqInput['fullname'] . ' ' . $setReqInput['lastName'];
        } else {
            $setReqInput['name'] = $setReqInput['fullname'];
        }

        $setReqInput['password'] = $setReqInput['newPassword'];
        $setReqInput['email'] = $setReqInput['username'];

        $exists = User::where('email', $setReqInput['email'])->first();
        if ($exists) {
            return response()->json(['status' => 23000, 'message' => 'Data Duplicate']);
        }

        $user = User::create([
            'name' => $setReqInput['name'],
            'email' => $setReqInput['email'],
            'password' => Hash::make($setReqInput['password']),
            'role' => 'user',
        ]);

        if (!empty($setReqInput['shoeType']) && is_array($setReqInput['shoeType'])) {
            $user->shoeTypes()->attach($setReqInput['shoeType']);
        }

        Auth::login($user);

        $user->sendEmailVerificationNotification();

        return response()->json(['status' => 200, 'message' => 'Create User Success']);
    }
}
