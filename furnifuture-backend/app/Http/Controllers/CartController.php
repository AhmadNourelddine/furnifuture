<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Product;
use Validator;

class CartController extends Controller
{
    public function sellProduct(Request $request){

        $validator = Validator::make($request->all(), [
            'title' => 'required|string|between:2,100',
            'description' => 'required|string|max:100',
            'location' => 'required|string|max:100',
            'phone_number' => 'required|string|max:100',
            'category' => 'required|string',
            'price' => 'required|numeric',
            'image' => 'string',
        ]);
        if($validator->fails()){
            return response()->json($validator->errors()->toJson(), 400);
        }
        
        $product = Product::create(array_merge(
                    $validator->validated(),
                ));


        return response()->json([
            'message' => 'Product successfully created',
            'product' => $product
        ], 201);
    }

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
        // $product_id = $request->get('product_id');
        $user = User::find($user_id);
        $array = $user->saved_products;
        unset($array["hi"]);
        $user->saved_products = $array;
        $user->save();
        // return response()->json(["status"=>"removed product successfully"]);
        return $user;
        
    }

    function getUserProducts(Request $request)
    {
        $user_id = $request->get('user_id');
        $user = User::find($user_id);
        $userProducts_ids = $user->user_products;
        $userProducts = Product::find($userProducts_ids);

        return response()->json([$userProducts]);
    }

    function getUserCartProducts(Request $request)
    {
        $user = User::find('6227e0604a0b3c034f18b28c');
        $userProducts_ids = $user->user_products;
        $userProducts = Product::find($userProducts_ids);

        return response()->json([$userProducts]);
    }
}
