<?php
namespace App\Http\Controllers;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;
use Illuminate\Http\Request;
use App\Models\Shipping_User;
use App\Models\User;
use Validator;

class UserController extends Controller
{

    public function notFound(){
        return response()->json(["error"=>"UnAuthorized User"]);
    }

    public function login(Request $request){
    	$validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required|string|min:6',
        ]);
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }
        if (! $token = auth()->attempt($validator->validated())) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }
        return $this->createNewToken($token);
    }

    public function register(Request $request) {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|between:2,100',
            'email' => 'required|string|email|max:100|unique:users',
            'password' => 'required|string|confirmed|min:6',
        ]);
        if($validator->fails()){
            return response()->json($validator->errors()->toJson(), 400);
        }

        $user = new User();
        $user->email = $request->email;
        $user->name = $request->name;
        $user->password = bcrypt($request->password);
        $user->user_products = [];
        $user->saved_products = [];
        $user->saved_shipping = [];
        $user->image = "";
        $user->save();

        return response()->json([
            'message' => 'User successfully registered',
            'user' => $user
        ], 201);
    }

    public function uploadProfileImage(Request $request) {

        $user = Auth::User();

        $validator = Validator::make($request->all(), [
            'image' => 'required|string',
        ]);
        if($validator->fails()){
            return response()->json($validator->errors()->toJson(), 400);
        }

        $base64_image = $request->image;

        @list($type, $file_data) = explode(';', $base64_image);
        @list(, $file_data) = explode(',', $file_data);

        $ext = explode(';base64',$base64_image);
        $ext = explode('/',$ext[0]);			
        $ext = $ext[1];

        $img_url = time().'.'.$ext;
        if($user->image){
            Storage::delete($user->image);
        }
        Storage::put($img_url, base64_decode($file_data));

        $user->image = $img_url;
        
        $user->save();

        return response()->json([
            'message' => 'Uploaded Profile Image Successfully',
            'user' => $user
        ], 201);
    }

    public function registerShipping(Request $request) {

        $validator = Validator::make($request->all(), [
            'name' => 'required|string|between:2,100',
            'email' => 'required|string|email|max:100|unique:users',
            'password' => 'required|string|confirmed|min:6',
            'phone_number' => 'required|string|max:12',
            'location' => 'required|string',
            'vehicle_load' => 'required|string',
            'image' => 'string',
        ]);

        if($validator->fails()){
            return response()->json($validator->errors()->toJson(), 400);
        }

        $user = new User();
        $user->email = $request->email;
        $user->name = $request->name;
        $user->password = bcrypt($request->password);
        $user->phone_number = $request->phone_number;
        $user->location = $request->location;
        $user->vehicle_load = $request->vehicle_load;
        $user->is_shipping = true;

        if(!empty($request->image)){
            $base64_image = $request->image;

            @list($type, $file_data) = explode(';', $base64_image);
            @list(, $file_data) = explode(',', $file_data);
    
            $ext = explode(';base64',$base64_image);
            $ext = explode('/',$ext[0]);			
            $ext = $ext[1];
    
            $img_url = time().'.'.$ext;
            Storage::put($img_url, base64_decode($file_data));
    
            $user->image = $img_url;    
        }
        else{
            $user->image = "";
        }
        $user->save();

        return response()->json([
            'message' => 'User successfully registered',
            'user' => $user
        ], 201);
    }

    public function updateProfile(Request $request)
    {
        
            $user = Auth::User();

            $validator = Validator::make($request->all(), [
                'name' => 'required|string|between:2,100',
                'email' => ['required','string','email','max:100', Rule::unique('user')->ignore($user->id)],
                'password' => 'required|string|confirmed|min:6',
            ]);

            if($validator->fails()){
                return response()->json($validator->errors()->toJson(), 400);
            }
            
            $user->name = $request->name;
            $user->email = $request->email;
            $user->password = bcrypt($request->password);

            $user->save();

            return response()->json([
                'message' => 'User successfully updated',
                'user' => $user
            ], 201);

    }

     public function updateProfileShipping(Request $request)
        {

                $user = Auth::User();
    
                $validator = Validator::make($request->all(), [
                    'name' => 'required|string|between:2,100',
                    'email' => ['required','string','email','max:100', Rule::unique('user')->ignore($user->id)],
                    'password' => 'required|string|confirmed|min:6',
                    'phone_number' => 'required|string|between:2,100',
                    'location' => 'required|string',
                    'vehicle_load' => 'required|string',
                    'image' => 'string|nullable',
                ]);
    
                if($validator->fails()){
                    return response()->json($validator->errors()->toJson(), 400);
                }
                
                $user->name = $request->name;
                $user->email = $request->email;
                $user->location = $request->location;
                $user->vehicle_load = $request->vehicle_load;
                $user->phone_number = $request->phone_number;
                $user->location = $request->location;
                $user->password = bcrypt($request->password);

                if(!empty($request->image)){
                    $base64_image = $request->image;
        
                    @list($type, $file_data) = explode(';', $base64_image);
                    @list(, $file_data) = explode(',', $file_data);
            
                    $ext = explode(';base64',$base64_image);
                    $ext = explode('/',$ext[0]);			
                    $ext = $ext[1];
            
                    $img_url = time().'.'.$ext;
                    if($user->image){
                        Storage::delete($user->image);
                    }
                    Storage::put($img_url, base64_decode($file_data));
            
                    $user->image = $img_url;    
                }

                $user->save();

                return response()->json([
                    'message' => 'User successfully updated',
                    'user' => $user
                ], 201);
    
        }


    public function logout() {
        auth()->logout();
        return response()->json(['message' => 'User successfully signed out']);
    }

    public function refresh() {
        return $this->createNewToken(auth()->refresh());
    }
 
    public function userProfile() {
        return response()->json(auth()->user());
    }

    protected function createNewToken($token){

        $user = auth()->user();
        if($user->image){
            $ext = pathinfo($user->image, PATHINFO_EXTENSION);
            $encoded_image = base64_encode(Storage::get($user->image));
            $user->image = 'data:image/'.$ext.';base64,'.$encoded_image;
        }
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60,
            'user' => $user,
        ]);
    }

    public function saveFirebaseToken(Request $request){

        $user = Auth::User();
        $validator = Validator::make($request->all(), [
            'firebaseToken' => 'required|string',
        ]);

        if($validator->fails()){
            return response()->json($validator->errors()->toJson(), 400);
        }

        $user->firebaseToken = $request->firebaseToken;
        $user->save();
        return response()->json([
            'message' => 'Token successfully saved',
            'user' => $user,
        ]);
    }
}