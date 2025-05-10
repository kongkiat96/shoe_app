<?php

use App\Http\Controllers\HomeController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Settings\ShoeController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

// Route::get('/dashboard', function () {
//     return view('dashboard');
//     // Route::get('home', [HomeController::class, 'index']);
// })->middleware(['auth', 'verified'])->name('home');

Route::middleware('auth')->group(function () {
    Route::get('home', [HomeController::class, 'index']);
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::prefix('settings')->group(function () {
        Route::prefix('/shoe-type')->group(function () {
            Route::get('/add-shoe-type', [ShoeController::class, 'shoeType'])->name('shoeType');
            Route::post('/get-data-shoe-type', [ShoeController::class, 'getDataShoeType']);
            Route::get('/show-shoe-type/{shoeTypeID}', [ShoeController::class, 'showShoeType']);
            Route::post('/edit-shoe-type/{shoeTypeID}', [ShoeController::class, 'editShoeType']);
            Route::post('/shoe-type-update-status', [ShoeController::class, 'shoeTypeUpdateStatus']);
            Route::post('/delete-shoe-type/{shoeTypeID}', [ShoeController::class, 'shoeTypeDelete']);
            Route::get('/create-shoe-type', [ShoeController::class, 'createShoeType']);
            Route::post('/save-shoe-type', [ShoeController::class, 'saveShoeType']);
        });
    });
});

require __DIR__ . '/auth.php';
