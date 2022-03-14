<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\ProductController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
Route::group([
    'middleware' => 'api',
    'prefix' => 'auth'
], function ($router) {
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/registerShipping', [AuthController::class, 'registerShipping']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/refresh', [AuthController::class, 'refresh']);
    Route::get('/user-profile', [AuthController::class, 'userProfile']);    
});

Route::post('/search-product', [ProductController::class, 'searchProduct']);
Route::post('/sell-product', [ProductController::class, 'sellProduct']);
Route::post('/edit-product', [ProductController::class, 'editProduct']);
Route::post('/saveProduct-toCart', [CartController::class, 'saveProduct']);
Route::post('/removeProduct-fromCart', [CartController::class, 'removeProduct']);
Route::post('/user-products', [ProductController::class, 'getUserProducts']);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
