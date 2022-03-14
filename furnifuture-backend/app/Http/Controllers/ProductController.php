<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
use Validator;

class ProductController extends Controller
{
    public function addProduct(Request $request)
    {    
     $validator = Validator::make($request->all(), [
         'title' => 'required|string',
         'description' => 'required|string',
         'category' => 'required|string',
         'location' => 'required|string',
         'phone_number' => 'required|string',
         'price' => 'required|float',
     ]);
 
     
     if($validator->fails()){
         return response()->json($validator->errors()->toJson(), 400);
     }
     $product = Product::create(array_merge(
         $validator->validated()
     ));
     return response()->json([$product,"success"=>true]);
    }
    
    public function editProduct(Request $request)
    {    
     $validator = Validator::make($request->all(), [
         'title' => 'required|string',
         'description' => 'required|string',
         'category' => 'required|string',
         'location' => 'required|string',
         'phone_number' => 'required|string',
         'price' => 'required|float',
     ]);
 
     
     if($validator->fails()){
         return response()->json($validator->errors()->toJson(), 400);
     }

    $product = Product::find($request->input('product_id'));
    $product->name = $request->input('name');
    $product->description = $request->input('description');
    $product->category = $request->input('category');
    $product->location = $request->input('location');
    $product->phone_number = $request->input('phone_number');
    $product->price = $request->input('price');
    $product->save();

     return response()->json([$product,"success"=>true]);
    }

    public function getCartProducts(Request $request)
    {
        $user_id = $request->input('user_id');
        $user = User::find($user_id);
        $savedProducts_ids = $user->saved_products;
        $savedProducts = Product::find($cartProducts_ids);
        return response()->json([$savedProducts]);
    }

    public function allProducts()
    {
        $products = Product::all();
        return response()->json([$products]);
    }

    public function deleteProduct(Request $request)
    {
        $product_id = $request->input('product_id');
        $product = Product::find($product_id);
        $product->delete();
        return response()->json(['status'=>'product deleted successfully']);
    }
}
