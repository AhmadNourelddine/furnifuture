<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\User;
use Validator;

class ProductController extends Controller
{
    public function sellProduct(Request $request){

        $validator = Validator::make($request->all(), [
            'user_id' => 'required|string',
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

        $user_id = $request->get('user_id');
        $user = User::find($user_id);
        $array = $user->user_products;
        array_push($array,$product->id);
        $user->user_products = $array;
        $user->save();

        return response()->json([
            'message' => 'Product successfully created',
            'product' => $product
        ], 201);
    }

    public function editProduct(Request $request){

        $validator = Validator::make($request->all(), [
            'product_id' => 'required|string',
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
        
        $product_id = $request->get('product_id');
        $product = Product::find($product_id);
        $product->update(array_merge(
                    $validator->validated(),
                ));

        return response()->json([
            'message' => 'Product successfully updated',
            'product' => $product
        ], 201);
    }
    

    function getUserProducts(Request $request)
    {
        $user_id = $request->get('user_id');
        $user = User::find($user_id);
        $userProducts_ids = $user->user_products;
        $userProducts = Product::find($userProducts_ids);

        return response()->json(["user_products"=>$userProducts]);
    }

    public function searchProduct(Request $request){
        
        $search_term = $request->input('search');
        $results = Product::where('title','LIKE','%'.$search_term.'%')
                            ->orWhere('description', 'LIKE', '%'.$search_term.'%')
                            ->orWhere('category', 'LIKE', '%'.$search_term.'%' )     
                            ->get();
        return response()->json([$results]);
    }

    public function searchShipping(Request $request){
        
        $search_term = $request->input('search');
        $results = User::where('location','LIKE',"%$search_term%")->get();
        return response()->json([$results]);
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
        // needs removing from user_products
        return response()->json(['status'=>'product deleted successfully']);
    }
}
