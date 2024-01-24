<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Auth;
use DB;
use Hash;
use Session;

class AuthController extends Controller
{
   public function login(Request $request){
    $credentials = $request->validate([
        'email' => ['required','email'],
        'password' => ['required'],
    ]);

    if(Auth::attempt($credentials)){
        $request->session()->regenerate();
        $user = User::where('email',$request->email)->first();

        shell_exec('php ../artisan passport:install');

        $successToken = $user->createToken('hrmis_token')->accessToken;
        session()->put('token', $successToken);

        return redirect()->route('dashboard');
    }
    return back()->withErrors([
        'email' => 'The provided credentials do not match our records.'
    ]);
   }  

   public function logout(Request $request){
    
   }
}
