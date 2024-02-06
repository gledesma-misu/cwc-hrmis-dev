<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Rules\MatchOldPassword;
use Auth;
use Session;
use Hash;

class ProfileController extends Controller
{
    public function index(){

        $user = Auth::user();
        return view('profile.index', compact('user'));

    }

    public function update(Request $request, $id){
        $request->validate([
            'name' => ['required'],
            'email' => ['required', 'email', 'unique:users,email,'.$id]
        ]);

        User::where('id', $id)->update([
            'name' => $request->name,
            'email' => $request->email,
        ]);

        Session::flash('success-message', 'Information updated successfully');
        return redirect()->route('profileIndex');
    }

    public function passwordUpdate(Request $request, $id){
         $request->validate([
            'old_password' => ['required', new MatchOldPassword],
             'password'  => ['required','confirmed'],
             'password_confirmation' => ['required']
            ]
        );

        User::find($id)->update(['password' => Hash::make($request->password)]);

        Session::flash('success-message', 'Password Updated Successfully');
        return redirect()->route('profileIndex');
    }
}
