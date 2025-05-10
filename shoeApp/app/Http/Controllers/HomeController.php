<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class HomeController extends Controller
{
    public function index(){
        $urlName = 'Home';
        $url = 'home';
        return view('home',[
            'urlName'   => $urlName,
            'url'       => $url,
        ]);
    }
}
