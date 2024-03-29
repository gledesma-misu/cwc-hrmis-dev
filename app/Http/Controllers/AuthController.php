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
    $user = Auth::user();
    DB::table('oauth_access_tokens')->where('id', $request->token_id)->where('user_id', $user->id)->update(['revoked' => 1]);

    Auth::logout();


    $request->session()->invalidate();
    $request->session()->regenerateToken();
    return redirect('/login');
   }

   public function register (Request $request){
    $request->validate([
        'email' => ['required', 'email'],
        'name' => ['required'],
        'password' => ['required', 'confirmed', 'min:6'],
    ]);


    User::create([
        
        'name'   => $request->name,
        'email'   => $request->email,
        'password'   => Hash::make($request->password),
    ]);

    Session::flash('success-message','Account created Successfully');

    return redirect('/login');

   }
}
