<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\User;
use Validator;

class ProductController extends Controller
{
    public function sellProduct(Request $request){

        $user = Auth::User();

        $validator = Validator::make($request->all(), [
            'title' => 'required|string|between:2,100',
            'description' => 'required|string|max:100',
            'location' => 'required|string|max:100',
            'phone_number' => 'required|string|max:100',
            'category' => 'required|string',
            'price' => 'required|string',
            'image' => 'string',
        ]);

        if($validator->fails()){
            return response()->json($validator->errors()->toJson(), 400);
        }

        $product = new Product();
        $product->title = $request->title;
        $product->description = $request->description;
        $product->category = $request->category;
        $product->location = $request->location;
        $product->phone_number = $request->phone_number;
        $product->price = $request->price;
        $product->user_id = $user->id;
        $product->save();

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
        
        $product_id = $request->product_id;
        $product = Product::find($product_id);

        $product->title = $request->title;
        $product->description = $request->description;
        $product->category = $request->category;
        $product->location = $request->location;
        $product->phone_number = $request->phone_number;
        $product->price = $request->price;
        $product->save();

        return response()->json([
            'message' => 'Product successfully updated',
            'product' => $product
        ], 201);
    }
    

    function getUserProducts(Request $request)
    {
        $user = Auth::User();
        $userProducts_ids = $user->user_products;
        $userProducts = Product::find($userProducts_ids);

        return response()->json(["user_products"=>$userProducts]);
    }

    public function searchProduct(Request $request){

        $validator = Validator::make($request->all(), [
            'search' => 'required|string',
        ]);
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $search_term = $request->search;
        $category = $request->category;

        if(!empty($category)){
            $results = Product::where('category', '=', $category)
            ->where('title','LIKE','%'.$search_term.'%')
            ->orWhere('description', 'LIKE', '%'.$search_term.'%')
                 
            ->get();
            return response()->json([$results]);
        }
        else{
            $results = Product::where('title','LIKE','%'.$search_term.'%')
            ->orWhere('description', 'LIKE', '%'.$search_term.'%')   
            ->get();
            return response()->json([$results]);
        }
    }

    public function allProducts()
    {
        $products = Product::all();
        return response()->json([$products]);
    }

    public function deleteProduct(Request $request)
    {   
        $user = Auth::User();
        $product_id = $request->product_id;

        $array = $user->user_products;
        unset($array[array_search($product_id,$array)]);
        $user->saved_products = $array;
        $user->save();

        $product = Product::find($product_id);
        $product->delete();

        return response()->json(['status'=>'product deleted successfully']);
    }
}
