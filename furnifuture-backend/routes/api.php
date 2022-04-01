<?php

use App\Http\Controllers\ContactUsController;
use App\Http\Controllers\ShippingController;
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
        Route::post('/upload-profile-image', 'uploadProfileImage')->name('upload-profile-image');
        Route::get('/profile', 'userProfile')->name('user-profile');
       });  

       Route::group(['prefix' => 'product'], function () {

        Route::controller(ProductController::class)->group(function () {  
            Route::post('/sell', 'sellProduct')->name('sell-product');
            Route::post('/edit', 'editProduct')->name('edit-product');
            Route::get('/created', 'getUserProducts')->name('user-products');
            Route::post('/delete', 'deleteProduct')->name('delete-product');
        });
       });

        Route::group(['prefix' => 'cart'], function () {

          Route::controller(CartController::class)->group(function () {  
            Route::post('/save-product', 'saveProduct')->name('save-product');
            Route::post('/save-shipping', 'saveShipping')->name('save-shipping');
            Route::post('/save-suggested-shipping', 'saveSuggestedShippings')->name('save-suggested-shipping');
            Route::post('/remove-product', 'removeProduct')->name('remove-product');
            Route::post('/remove-shipping', 'removeShipping')->name('remove-shipping');
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

Route::controller(ProductController::class)->group(function () {
  Route::get('/random-products', 'randomProducts')->name('random-products');
  Route::post('/search-products', 'searchProduct')->name('search-products');
});

Route::controller(ShippingController::class)->group(function () {
  Route::get('/random-shippings', 'randomShippings')->name('random-shippings');
  Route::post('/search-shipping', 'searchShipping')->name('search-shipping');
});

Route::controller(ContactUsController::class)->group(function () {
  Route::post('/contact-us', 'contactUsMessage')->name('contact-us-message');
});

Route::post('/suggest-shipping', [ShippingController::class, 'suggestShippings'])->name('suggest-shipping');

Route::get('/notfound', [UserController::class, 'notFound'])->name('not-found');

 

