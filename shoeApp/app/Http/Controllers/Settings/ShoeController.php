<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use App\Models\Settings\ShoeType;
use Illuminate\Http\Request;

class ShoeController extends Controller
{
    private $shoeType;

    public function __construct()
    {
        $this->shoeType = new ShoeType();
    }
    public function shoeType()
    {
        $url        = request()->segments();
        $urlName    = "รายการข้อมูลประเภทรองเท้า";
        $urlSubLink = "add-shoe-type";
        return view('Settings.shoeType.index',[
            'url'           => $url,
            'urlName'       => $urlName,
            'urlSubLink'    => $urlSubLink,
        ]);
    }

    public function getDataShoeType(Request $request)
    {
        $getDataToTable = $this->shoeType->getDataShoeType($request);
        // dd($getDataToTable);
        return response()->json($getDataToTable);
    }

    public function showShoeType($shoeTypeID){
        if(request()->ajax()) {
            $encryptedID = decrypt($shoeTypeID);
            $shoeType = ShoeType::find($encryptedID);
            // dd($shoeType);
            return view('Settings.shoeType.dialog.editShoeType', [
                'dataShoeType' => $shoeType,
                'decryptID'    => $shoeTypeID
            ]);
        }
        return abort(404);
    }

    public function editShoeType(Request $request, $shoeTypeID) {
        $setRequest = $request->all();
        $saveEditData = $this->shoeType->editShoeType($setRequest, $shoeTypeID);
        return response()->json(['status' => $saveEditData['status'], 'message' => $saveEditData['message']]);
    }

    public function shoeTypeUpdateStatus(Request $request)
    {
        $setRequest = $request->all();
        $saveEditStatus = $this->shoeType->shoeTypeUpdateStatus($setRequest);
        return response()->json(['status' => $saveEditStatus['status'], 'message' => $saveEditStatus['message']]);
    }

    public function shoeTypeDelete($shoeTypeID) {
        $softDelete = $this->shoeType->shoeTypeDelete($shoeTypeID);
        return response()->json(['status' => $softDelete['status'], 'message' => $softDelete['message']]);
    }

    public function createShoeType(){
        return view('Settings.shoeType.dialog.addShoeType');
    }

    public function saveShoeType(Request $request){
        $setRequest = $request->all();
        $saveShoeType = $this->shoeType->saveShoeType($setRequest);
        return response()->json(['status' => $saveShoeType['status'], 'message' => $saveShoeType['message']]);
    }
}
