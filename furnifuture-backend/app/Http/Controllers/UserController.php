<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Models\Shipping_User;
use Illuminate\Validation\Rule;
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

        $user = User::create(array_merge(
                    $validator->validated(),
                    ['password' => bcrypt($request->password)],
                    ['user_products'=>[]],
                    ['saved_products'=>[]],
                    ['saved_shipping'=>[]],
                ));


        return response()->json([
            'message' => 'User successfully registered',
            'user' => $user
        ], 201);
    }

    public function registerShipping(Request $request) {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|between:2,100',
            'email' => 'required|string|email|max:100|unique:users',
            'password' => 'required|string|confirmed|min:6',
            'phone_number' => 'required|regex:/[0-9]{8}',
            'location' => 'required|string',
            'vehicle_load' => 'required|numeric',
        ]);
        if($validator->fails()){
            return response()->json($validator->errors()->toJson(), 400);
        }
        
        $user = User::create(array_merge(
                    $validator->validated(),
                    ['password' => bcrypt($request->password)],
                    ['is_shipping'=>true],
                ));


        return response()->json([
            'message' => 'User successfully registered',
            'user' => $user
        ], 201);
    }


    public function updateProfile(Request $request)
    {
        if (Auth::check())
        {
            $user = Auth::user();

            $validator = Validator::make($request->all(), [
                'name' => 'required|string|between:2,100',
                'email' => ['required','string','email','max:100', Rule::unique('users')->ignore($user->id)],
                'password' => 'required|string|confirmed|min:6',
            ]);

            if($validator->fails()){
                return response()->json($validator->errors()->toJson(), 400);
            }
            
            $user->name = $request->input('name');
            $user->email = $request->input('email');
            $user->password = bcrypt($request->input('password'));
            $user->save();

            return response()->json([
                'message' => 'User successfully updated',
                'user' => $user
            ], 201);

        }
    }

     public function updateProfileShipping(Request $request)
        {
            if (Auth::check())
            {
                $user = Auth::user();
    
                $validator = Validator::make($request->all(), [
                    'name' => 'required|string|between:2,100',
                    'email' => ['required','string','email','max:100', Rule::unique('users')->ignore($user->id)],
                    'password' => 'required|string|confirmed|min:6',
                    'phone_number' => 'required|string|between:2,100',
                    'location' => 'required|string',
                    'vehicle_load' => 'required|float',
                ]);
    
                if($validator->fails()){
                    return response()->json($validator->errors()->toJson(), 400);
                }
                
                $user->name = $request->input('name');
                $user->email = $request->input('email');
                $user->password = bcrypt($request->input('password'));
                $user->save();
    
                return response()->json([
                    'message' => 'User successfully updated',
                    'user' => $user
                ], 201);
    
            }
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
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60,
            'user' => auth()->user()
        ]);
    }
}