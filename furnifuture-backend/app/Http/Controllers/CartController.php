<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Product;
use Validator;

class CartController extends Controller
{
    public function saveProduct(Request $request)
    {
        $user_id = $request->get('user_id');
        $product_id = $request->get('product_id');
        $user = User::find($user_id);
        $array = $user->saved_products;
        array_push($array,$product_id);
        $user->saved_products = $array;
        $user->save();
        return response()->json(["status"=>"saved product successfully"]);
    }
}
