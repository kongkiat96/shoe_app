<?php

namespace App\Http\Controllers\Settings;

use App\Exports\FavouriteShoesExport;
use App\Http\Controllers\Controller;
use App\Models\Favourite;
use App\Models\Master\MasterModel;
use App\Models\Settings\ShoeModel;
use App\Models\Settings\ShoeType;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Maatwebsite\Excel\Facades\Excel;

class ShoeController extends Controller
{
    private $shoeType;
    private $functionMaster;
    private $shoe;
    private $favourites;

    public function __construct()
    {
        $this->shoeType = new ShoeType();
        $this->functionMaster = new MasterModel();
        $this->shoe = new ShoeModel();
        $this->favourites = new Favourite();
    }
    public function shoeType()
    {
        $url        = request()->segments();
        $urlName    = "รายการข้อมูลประเภทรองเท้า";
        $urlSubLink = "add-shoe-type";
        return view('Settings.shoeType.index', [
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

    public function showShoeType($shoeTypeID)
    {
        if (request()->ajax()) {
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

    public function editShoeType(Request $request, $shoeTypeID)
    {
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

    public function shoeTypeDelete($shoeTypeID)
    {
        $softDelete = $this->shoeType->shoeTypeDelete($shoeTypeID);
        return response()->json(['status' => $softDelete['status'], 'message' => $softDelete['message']]);
    }

    public function createShoeType()
    {
        return view('Settings.shoeType.dialog.addShoeType');
    }

    public function saveShoeType(Request $request)
    {
        $setRequest = $request->all();
        $saveShoeType = $this->shoeType->saveShoeType($setRequest);
        return response()->json(['status' => $saveShoeType['status'], 'message' => $saveShoeType['message']]);
    }

    public function shoeBrand()
    {
        $url        = request()->segments();
        $urlName    = "รายการข้อมูลรองเท้า";
        $urlSubLink = "add-shoe-brand";
        return view('Settings.Shoe.index', [
            'url'           => $url,
            'urlName'       => $urlName,
            'urlSubLink'    => $urlSubLink,
        ]);
    }

    public function createShoe()
    {
        $url        = request()->segments();
        $urlName    = "เพิ่มรายการรองเท้า";
        $urlSubLink = "add-shoe-brand";

        $masterShoeType = $this->functionMaster->getDataShoeType();
        // dd($masterShoeType);
        return view('Settings.Shoe.page.createShoe', [
            'url'           => $url,
            'urlName'       => $urlName,
            'urlSubLink'    => $urlSubLink,
            'masterShoeType' => $masterShoeType
        ]);
    }

    public function saveShoe(Request $request)
    {
        $saveDataShoe = $this->shoe->saveShoe($request);
        return response()->json(['status' => $saveDataShoe['status'], 'message' => $saveDataShoe['message']]);
    }

    public function getDataShoeBrand(Request $request)
    {
        $getDataToTable = $this->shoe->getDataShoeBrand($request);
        // dd($getDataToTable);
        return response()->json($getDataToTable);
    }

    public function showShoe($shoeID)
    {
        if (request()->ajax()) {
            $encryptedID = decrypt($shoeID);
            $shoe = ShoeModel::find($encryptedID);
            // dd($shoe);
            $masterShoeType = $this->functionMaster->getDataShoeType();
            return view('Settings.Shoe.dialog.editShoe', [
                'dataShoe' => $shoe,
                'decryptID'    => $shoeID,
                'masterShoeType' => $masterShoeType
            ]);
        }
        return abort(404);
    }

    public function editShoe(Request $request, $shoeID)
    {
        $setRequest = $request->all();
        $saveEditData = $this->shoe->editShoe($setRequest, $shoeID);
        return response()->json(['status' => $saveEditData['status'], 'message' => $saveEditData['message']]);
    }

    public function shoeUpdateStatus(Request $request)
    {
        $setRequest = $request->all();
        $saveEditStatus = $this->shoe->shoeUpdateStatus($setRequest);
        return response()->json(['status' => $saveEditStatus['status'], 'message' => $saveEditStatus['message']]);
    }

    public function shoeDelete($shoeID)
    {
        $softDelete = $this->shoe->shoeDelete($shoeID);
        return response()->json(['status' => $softDelete['status'], 'message' => $softDelete['message']]);
    }

    public function addFavourite(Request $request)
    {
        // dd($request);
        $shoeID = $request->input('shoe_id');

        $exists = Favourite::where('user_id', Auth::id())->where('shoe_id', $shoeID)->first();
        if ($exists) {
            return response()->json(['status' => 23000, 'message' => 'Data Duplicate']);
        }

        Favourite::create([
            'user_id' => Auth::id(),
            'shoe_id' => $shoeID
        ]);

        return response()->json(['status' => 200, 'message' => 'Data Saved Successfully']);
    }

    public function getFavourites()
    {
        $favourites = $this->favourites->getFavourites('me');
        // dd($favourites);
        return view('favourite', [
            'dataFavourites' => $favourites
        ]);
    }

    public function removeFavourite(Request $request)
    {
        $userId = Auth::id();
        $shoeId = $request->shoe_id;

        $favourite = Favourite::where('user_id', $userId)
            ->where('shoe_id', $shoeId)
            ->first();

        if ($favourite) {
            $favourite->delete();
            return response()->json(['status' => 'success']);
        }

        return response()->json(['status' => 'error']);
    }

    public function exportFavourites($type)
    {
        if($type == 'all'){
            $setStr = '_(ทั้งหมด)';
        } else {
            $setStr = '_(ของฉัน)';
        }
        return Excel::download(new FavouriteShoesExport($type), 'favourites_'.Auth::user()->name.$setStr.'.xlsx');
    }
}
