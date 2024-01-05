<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Role;
use Session;

class RoleController extends Controller
{
    
    //For Laravel
    public function index(){
        $roles = Role::all();
        return view('management.roles.index', compact('roles'));
    }

    public function create(){
        return view('management.roles.create');
    }

    public function store(Request $request){


        $request->validate([
            'name'           => ['required'],
            'display_name'   => ['required'],
            'description'    => ['required'],
        ]);

        Role::create([
            'name'          => $request->name   , 
            'display_name'  => $request->display_name,
            'description'   => $request->description,
        ]);

        Session::flash('success-message', 'Role created successfully');

        return redirect()->route('rolesIndex');
    }

    public function edit($id){
        $roles = Role::find($id);
        return view('management.roles.edit', compact('roles'));
    }

    public function update(Request $request, $id){
        $request->validate([
            'name'           => ['required'],
            'display_name'   => ['required'],
            'description'    => ['required'],
        ]);

        Role::where('id', $id)->update([
            'name'          => $request->name   , 
            'display_name'  => $request->display_name,
            'description'   => $request->description,
        ]);

        Session::flash('success-message', 'Role updated successfully');

        return redirect()->route('rolesIndex');
    }

    public function delete($id){
        // Role::where('id', $id)->delete();
        Session::flash('success-message', 'Role deleted successfully');
        return redirect()->route('rolesIndex');
    }

}
