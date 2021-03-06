<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\User;
use Validator;

class CartController extends Controller
{

    public function saveProduct(Request $request)
    {
        $user = Auth::User();

        $validator = Validator::make($request->all(), [
            'product_id' => 'required|string',
        ]);
        if($validator->fails()){
            return response()->json($validator->errors()->toJson(), 400);
        }
        $product_id = $request->product_id;
        $array = $user->saved_products;
        if(array_search($product_id,$array)){
            return response()->json(["status"=>"product already saved"]); 
        }
        array_push($array,$product_id);
        $user->saved_products = $array;
        $user->save();
        return response()->json(["status"=>"saved product successfully"]);
    }

    public function saveShipping(Request $request)
    {
        $user = Auth::User();

        $validator = Validator::make($request->all(), [
            'shipping_id' => 'required|string',
        ]);
        if($validator->fails()){
            return response()->json($validator->errors()->toJson(), 400);
        }

        $shipping_id = $request->shipping_id;
        $array = $user->saved_shipping;
        if(array_search($shipping_id,$array)){
            return response()->json(["status"=>"shipping already saved"]); 
        }
        array_push($array,$shipping_id);
        $user->saved_shipping = $array;
        $user->save();
        return response()->json(["status"=>"saved shipping successfully"]);
    }

    public function saveSuggestedShippings(Request $request)
    {
        $user = Auth::User();

        $validator = Validator::make($request->all(), [
            'saved_shippings' => 'required|array',
        ]);
        if($validator->fails()){
            return response()->json($validator->errors()->toJson(), 400);
        }

        $shipping_ids = $request->saved_shippings;
        $array = $user->saved_shipping;
        foreach($shipping_ids as $shipping_id)
        {
            if(!array_search($shipping_id,$array)){
                array_push($array,$shipping_id);
            }
        } 
      
        $user->saved_shipping = $array;
        $user->save();
        return response()->json(["status"=>"saved shippings successfully"]);
    }

    public function removeProduct(Request $request)
    {
        $user = Auth::User();

        $validator = Validator::make($request->all(), [
            'product_id' => 'required|string',
        ]);
        if($validator->fails()){
            return response()->json($validator->errors()->toJson(), 400);
        }

        $product_id = $request->product_id;
        $array = $user->saved_products;
        if(array_search($product_id,$array))
        {
            unset($array[array_search($product_id,$array)]);
            $array = array_values($array);
        }
        $user->saved_products = $array;
        $user->save();
        return response()->json(["status"=>"removed product successfully",
                                  "user"=>$user]);  
    }

    public function removeShipping(Request $request)
    {
        $user = Auth::User();

        $validator = Validator::make($request->all(), [
            'shipping_id' => 'required|string',
        ]);
        if($validator->fails()){
            return response()->json($validator->errors()->toJson(), 400);
        }
        
        $shipping_id = $request->shipping_id;
        $array = $user->saved_shipping;
        if(array_search($shipping_id,$array))
        {
            unset($array[array_search($shipping_id,$array)]);
            $array = array_values($array);
        }
        $user->saved_shipping = $array;
        $user->save();
        return response()->json(["status"=>"removed shipping successfully",
                                  "user"=>$user]);  
    }

    public function getCartProducts(Request $request)
    {
        $user = Auth::User();
        $savedProducts_ids = $user->saved_products;
        $savedProducts = Product::find($savedProducts_ids);
        foreach($savedProducts as $product){
            if($product->image){
                $ext = pathinfo($product->image, PATHINFO_EXTENSION);
                $encoded_image = base64_encode(Storage::get($product->image));
                $product->image = 'data:image/'.$ext.';base64,'.$encoded_image;
            }
        }
        return response()->json([$savedProducts]);
    }

    public function getCartShipping(Request $request)
    {
        $user = Auth::User();
        $savedShipping_ids = $user->saved_shipping;
        $savedShipping = User::find($savedShipping_ids);
        foreach($savedShipping as $shipping){
            if($shipping->image){
                $ext = pathinfo($shipping->image, PATHINFO_EXTENSION);
                $encoded_image = base64_encode(Storage::get($shipping->image));
                $shipping->image = 'data:image/'.$ext.';base64,'.$encoded_image;
            }
        }
        return response()->json([$savedShipping]);
    }

}
