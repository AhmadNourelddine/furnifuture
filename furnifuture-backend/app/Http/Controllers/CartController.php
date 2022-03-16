<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
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

    public function saveShipping(Request $request)
    {
        $user_id = $request->get('user_id');
        $shipping_id = $request->get('shipping_id');
        $user = User::find($user_id);
        $array = $user->saved_shipping;
        array_push($array,$shipping_id);
        $user->saved_shipping = $array;
        $user->save();
        return response()->json(["status"=>"saved shipping successfully"]);
    }

    public function removeProduct(Request $request)
    {
        $user_id = $request->get('user_id');
        $product_id = $request->get('product_id');
        $user = User::find($user_id);
        $array = $user->saved_products;
        unset($array[array_search($product_id,$array)]);
        $user->saved_products = $array;
        $user->save();
        return response()->json(["status"=>"removed product successfully",
                                  "user"=>$user]);  
    }

    public function removeShipping(Request $request)
    {
        $user_id = $request->get('user_id');
        $shipping_id = $request->get('shipping_id');
        $user = User::find($user_id);
        $array = $user->saved_shippings;
        unset($array[array_search($shipping_id,$array)]);
        $user->saved_shippings = $array;
        $user->save();
        return response()->json(["status"=>"removed shipping successfully",
                                  "user"=>$user]);  
    }

    public function getCartProducts(Request $request)
    {
        $user_id = $request->input('user_id');
        $user = User::find($user_id);
        $savedProducts_ids = $user->saved_products;
        $savedProducts = Product::find($savedProducts_ids);
        return response()->json([$savedProducts]);
    }

    public function getCartShipping(Request $request)
    {
        $user_id = $request->input('user_id');
        $user = User::find($user_id);
        $savedShipping_ids = $user->saved_shipping;
        $savedShipping = User::find($savedShipping_ids);
        return response()->json([$savedShipping]);
    }

}
