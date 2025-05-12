<?php

namespace App\Http\Controllers;

use App\Models\Favourite;
use App\Models\Master\MasterModel;

class HomeController extends Controller
{
    private $functionMaster;
    private $favourites;

    public function __construct(){
        $this->functionMaster = new MasterModel();
        $this->favourites = new Favourite();
    }
    public function index(){
        $urlName = 'Home';
        $url = 'home';
        $masterShoeType = $this->functionMaster->getDataShoeType();
        $dataShoe = $this->functionMaster->getDataShoe();
        // dd($dataShoe);
        $favourites = $this->favourites->getFavourites('me');
        $shoeTypeFav = $this->functionMaster->getShoeTypeFavorite();
        // dd($favourites);
        return view('home',[
            'urlName'   => $urlName,
            'url'       => $url,
            'masterShoeType' => $masterShoeType,
            'dataShoes' => $dataShoe,
            'dataFavourites' => $favourites,
            'shoeTypeFav' => $shoeTypeFav
        ]);
    }
}
