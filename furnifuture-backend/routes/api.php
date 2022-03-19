<?php

use App\Http\Controllers\ProductController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\CartController;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;


Route::group(['middleware' => ['auth:api']], function () {
    
    Route::group(['prefix' => 'user'], function () {

        Route::controller(UserController::class)->group(function () {  
        Route::post('/update-profile', 'updateProfile')->name('update-profile');
        Route::post('/update-shipping-profile', 'updateProfileShipping')->name('update-shipping-profile');
        Route::post('/logout', 'logout')->name('logout');
        Route::post('/refresh', 'refresh')->name('refresh');
        Route::get('/profile', 'userProfile')->name('user-profile');
       });  

       Route::group(['prefix' => 'product'], function () {
        Route::controller(ProductController::class)->group(function () {  
            Route::post('/sell', 'sellProduct')->name('sell-product');
            Route::post('/edit', 'editProduct')->name('edit-product');
            Route::post('/created', 'getUserProducts')->name('user-products');
            Route::post('/delete', 'deleteProduct')->name('delete-product');
        });
       });

        Route::group(['prefix' => 'cart'], function () {

          Route::controller(CartController::class)->group(function () {  
            Route::post('/saveProduct', 'saveProduct')->name('save-product');
            Route::post('/saveShipping', 'saveShipping')->name('save-shipping');
            Route::post('/removeProduct', 'removeProduct')->name('remove-product');
            Route::post('/removeShipping', 'removeShipping')->name('remove-shipping');
            Route::get('/get-products', 'getCartProducts')->name('get-products');
            Route::get('/get-shipping', 'getCartShipping')->name('get-shipping');
          });
        });

    });


});

Route::group(['prefix' => 'auth'], function () {
    Route::post('/login', [UserController::class, 'login']);
    Route::post('/register', [UserController::class, 'register']);
    Route::post('/register-shipping', [UserController::class, 'registerShipping']);
});

Route::get('/notfound', [UserController::class, 'notFound'])->name('not-found');
Route::get('/random-products', [ProductController::class, 'allProducts'])->name('all-products');
Route::get('/random-shippings', [ProductController::class, 'allShippings'])->name('all-shippings');


// Route::group(['prefix' => 'auth'], function () {
//     Route::post('/login', [UserController::class, 'login']);
//     Route::post('/register', [UserController::class, 'register']);
//     Route::post('/register-shipping', [UserController::class, 'registerShipping']);
//     Route::post('/update-profile', [UserController::class, 'updateProfile']);
//     Route::post('/update-shipping-profile', [UserController::class, 'updateProfileShipping']);
//     Route::post('/logout', [UserController::class, 'logout']);
//     Route::post('/refresh', [UserController::class, 'refresh']);
//     Route::get('/user-profile', [UserController::class, 'userProfile']);    
// });

// Route::controller(ProductController::class)->group(function () {
//     Route::post('/search-product', 'searchProduct');
//     Route::post('/search-shipping', 'searchShipping');
//     Route::post('/sell-product', 'sellProduct');
//     Route::post('/edit-product', 'editProduct');
//     Route::post('/user-products', 'getUserProducts');
//     Route::post('/delete-product', 'deleteProduct');
//     Route::post('/random-products', 'allProducts');
//     Route::post('/random-shippings', 'allShippings');
// });

// Route::controller(CartController::class)->group(function () {
//     Route::post('/saveProduct-toCart', 'saveProduct');
//     Route::post('/saveShipping-toCart', 'saveShipping');
//     Route::post('/removeProduct-fromCart', 'removeProduct');
//     Route::post('/removeShipping-fromCart', 'removeShipping');
//     Route::post('/get-products', 'getCartProducts');
//     Route::post('/get-shipping', 'getCartShipping');
// });

