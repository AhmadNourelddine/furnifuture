<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\User;
use Validator;

class ShippingController extends Controller
{
    public function searchShipping(Request $request){

        $validator = Validator::make($request->all(), [
            'search' => 'string',
        ]);
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }
        
        $search_term = $request->search;
        $location = $request->location;
        $vehicle_load = $request->vehicle_load;

        if(empty($location) && empty($vehicle_load)){
            $results = User::all()->where('is_shipping','=','true')
            ->where('name','=',$search_term);
            // ->orwhere('email','=',$search_term);   
            return response()->json([$results]);
        }
        else if(empty($category)){
            $results = User::all()->where('is_shipping','=','true')
            ->where('name','=', $search_term)
            ->orWhere('email','=', $search_term)
            ->where('location', '=', $location);   
            return response()->json([$results]);
        }
        else if(empty($location)){
            $results = User::all()->where('is_shipping','=','true')
            ->where('name','=', $search_term)
            ->orWhere('email','=', $search_term)
            ->where('category', '=', $category);   
            return response()->json([$results]);
        }
        else{
            $results = User::all()->where('is_shipping','=','true')
            ->where('name','=', $search_term)
            ->orWhere('email','=', $search_term)
            ->where('location', '=', $location)  
            ->where('category', '=', $category);   
            return response()->json([$results]);
        }

    }

    public function randomShippings()
    {
        // $shippings = User::all()->where('is_shipping','=','true');
        $shippings = User::all()->where('is_shipping','=','true')->random(4);
        foreach($shippings as $shipping){
            if($shipping->image){
                $ext = pathinfo($shipping->image, PATHINFO_EXTENSION);
                $encoded_image = base64_encode(Storage::get($shipping->image));
                $shipping->image = 'data:image/'.$ext.';base64,'.$encoded_image;
            }
        }
        return response()->json($shippings);
    }

    public function suggestShippings()
    {
        $shippings = User::all()->where('is_shipping','=','true')->take(3);
        return response()->json($shippings);
    }

}


 // ->where(function($query) use($search_term, $location, $vehicle_load){
                        //                     $query->where('name','=',$search_term)
                        //                         ->orWhere('email','=',$search_term)
                        //                         ->orWhere('location','=',$location)
                        //                         ->orWhere('vehicle_load','=',$vehicle_load)
                        //                         ->get();
                        //                 });
                        
                        // ->where(function ($query) use($search_term, $location, $vehicle_load){
                        //     $query->where('name','LIKE','%'.$search_term.'%')
                        //           ->orWhere('email','LIKE','%'.$search_term.'%')
                        //           ->orWhere('location','LIKE','%'.$location.'%')
                        //           ->orWhere('vehicle_load','LIKE','%'.$vehicle_load.'%');
                        // })
                        // ->get();