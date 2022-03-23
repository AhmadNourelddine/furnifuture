<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ContactUs;
use Validator;


class ContactUsController extends Controller
{
    function contactUsMessage(Request $request)
    {
        $cu_message = new ContactUs;

        $validator = Validator::make($request->all(), [
            'email' => 'required|string|email',
            'message' => 'required|string',
            'subject' => 'required|string',
        ]);

        if($validator->fails()){
            return response()->json($validator->errors()->toJson(), 400);
        }

        $cu_message->email= $request->email;
        $cu_message->message= $request->message;
        $cu_message->subject= $request->subject;

        $cu_message->save();

        return response()->json(["status"=>true]);

    }
}
