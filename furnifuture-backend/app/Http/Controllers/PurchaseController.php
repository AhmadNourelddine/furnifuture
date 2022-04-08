<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Models\Purchase;
use App\Models\Product;
use App\Models\User;
use Validator;

class PurchaseController extends Controller
{
    public function savePurchase(Request $request){

        $user = Auth::User();

        $validator = Validator::make($request->all(), [
            'product_id' => 'required|string',
            'user_id' => 'required|string',
            'shipping_id' => 'required|string',
            'cardInfo' => 'required',
            'price' => 'required|string',
        ]);

        if($validator->fails()){
            return response()->json($validator->errors()->toJson(), 400);
        }

        $purchase = new Purchase();
        $purchase->product_id = $request->product_id;
        $purchase->user_id = $request->user_id;
        $purchase->shipping_id = $request->shipping_id;
        $purchase->card_details = $request->cardInfo;
        $purchase->payment = $request->price;
        $purchase->save();
        
        $product = Product::find($request->product_id);
        $product->is_sold = true;
        $product->save();

        return response()->json([
            'message' => 'Product successfully purchased',
            'purchase' => $purchase
        ], 201);
    }
}
