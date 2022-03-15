<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\ProductController;


Route::group([
    'middleware' => 'api',
    'prefix' => 'auth'
], function ($router) {
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/registerShipping', [AuthController::class, 'registerShipping']);
    Route::post('/update-profile', [AuthController::class, 'updateProfile']);
    Route::post('/update-shipping-profile', [AuthController::class, 'updateProfileShipping']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/refresh', [AuthController::class, 'refresh']);
    Route::get('/user-profile', [AuthController::class, 'userProfile']);    
});

Route::controller(ProductController::class)->group(function () {
    Route::post('/search-product', 'searchProduct');
    Route::post('/search-shipping', 'searchShipping');
    Route::post('/sell-product', 'sellProduct');
    Route::post('/edit-product', 'editProduct');
    Route::post('/user-products', 'getUserProducts');
    Route::post('/delete-product', 'deleteProduct');
});

Route::controller(CartController::class)->group(function () {
    Route::post('/saveProduct-toCart', 'saveProduct');
    Route::post('/saveShipping-toCart', 'saveShipping');
    Route::post('/removeProduct-fromCart', 'removeProduct');
    Route::post('/removeShipping-fromCart', 'removeShipping');
    Route::post('/get-products', 'getCartProducts');
    Route::post('/get-shipping', 'getCartShipping');
});

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
