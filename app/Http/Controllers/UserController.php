<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\User;

class UserController extends Controller
{
    public function index(){
        return view('management.users.index');
    }

    public function storeUser(Request $request){
        $request->validate([
            'name'             => 'required',
            'email'            =>'required',
            'password'         =>'required',
        ]);


        User::create([
            'department_id'   => $
        ]);
    }
}
