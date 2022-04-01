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
            'search' => 'string|nullable',
            'location' => 'string|nullable',
            'vehicle_load' => 'string|nullable',
        ]);
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }
        
        $search_term = $request->search;
        $location = $request->location;
        $vehicle_load = $request->vehicle_load;

        if(empty($location) && empty($vehicle_load) && !empty($search_term)){
            $results = User::where('is_shipping','=',true)
                            ->where('name','LIKE','%'.$search_term.'%')
                            ->where('email','LIKE','%'.$search_term.'%')
                            ->get();   
            return response()->json([$results]);
        }
        else if(empty($vehicle_load) && !empty($search_term)){
            $results = User::where('is_shipping','=',true)
                            ->where('location','=', $location)
                            ->where(function ($query) use($search_term){
                                return $query 
                                ->where('name','LIKE','%'.$search_term.'%')
                                ->orWhere('email','LIKE','%'.$search_term.'%');
                            })->get();
            return response()->json([$results]);
        }
        else if(empty($location) && !empty($search_term)){
            $results = User::where('is_shipping','=',true)
            ->where('vehicle_load','=', $vehicle_load)
            ->where(function ($query) use($search_term){
                return $query 
                ->where('name','LIKE','%'.$search_term.'%')
                ->orWhere('email','LIKE','%'.$search_term.'%');
            })->get();
            return response()->json([$results]);
        }
        else if(!empty($location) && !empty($vehicle_load) && empty($search_term)){
            $results = User::where('is_shipping','=',true)
            ->where('location', '=', $location)  
            ->where('vehicle_load', '=', $vehicle_load)
            ->get();   
            return response()->json([$results]);
        }
        else if(!empty($location) && !empty($vehicle_load) && !empty($search_term)){
            $results = User::where('is_shipping','=',true)
            ->where('location', '=', $location)  
            ->where('category', '=', $category)
            ->where(function ($query) use($search_term){
                return $query 
                ->where('name','LIKE','%'.$search_term.'%')
                ->orWhere('email','LIKE','%'.$search_term.'%');
            })->get();   
            return response()->json([$results]);
        }
        else if(!empty($location) && empty($vehicle_load) && empty($search_term)){
            $results = User::where('is_shipping','=',true)
            ->where('location', '=', $location)
            ->get();   
            return response()->json([$results]);
        }
        else{
            $results = User::where('is_shipping','=',true)
            ->where('vehicle_load', '=', $vehicle_load)
            ->get();   
            return response()->json([$results]);
        }

    }

    public function randomShippings()
    {
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

    public function suggestShippings(Request $request)
    {   
        $city_user = $request->city_user;
        $city_product = $request->city_product;

        if($city_user || $city_product){
            $shippings = User::where('is_shipping','=','true')
                                ->orWhere('location', $city_product)
                                ->orWhere('location', $city_user)
                                ->take(3)
                                ->get();
        }
        if(!$shippings->count() || (empty($city_product) && empty($city_user)) ){
            $shippings = User::all()->where('is_shipping','=','true')->random(3);
        }
        return response()->json($shippings);
    }

}
