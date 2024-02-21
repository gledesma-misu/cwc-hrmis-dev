<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Role;
use Session;
use Validator;

class RoleController extends Controller
{
    
    //For Laravel
    public function search(Request $request){

        if($request->search_type == 'name'){
            $search_value = $request->search_value;
            $roles = Role::where(function($query) use ($search_value){
                $query->where('name' , 'LIKE', "%$search_value%")
               ->orWhere('display_name' , 'LIKE', "%$search_value%");
               
            })->orderBy('id','desc')->paginate(10);
        }
        return view('management.roles.index', compact('roles', 'search_value'));
   
    }
    public function index(){
        $roles = Role::orderBy('id','desc')->paginate(10);
        return view('management.roles.index', compact('roles'));
    }

    public function create(){
        return view('management.roles.create');
    }

    public function store(Request $request){


        // $request->validate([
        //     'name'           => ['required'],
        //     'display_name'   => ['required'],
        //     'description'    => ['required'],
        // ]);old validation

        $validation = Validator::make($request->all(), [
            'name'           => 'required',
            'display_name'   => 'required',
            'description'    => 'required'  
        ]);

        if($validation->fails()){
            return redirect()->back()->withErrors($validation);
        }

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
        // $request->validate([
        //     'name'           => ['required'],
        //     'display_name'   => ['required'],
        //     'description'    => ['required'],
        // ]);old validation

        $validation = Validator::make($request->all(), [
            'name'           => 'required',
            'display_name'   => 'required',
            'description'    => 'required'  
        ]);

        if($validation->fails()){
            return redirect()->back()->withErrors($validation);
        }

        Role::where('id', $id)->update([
            'name'          => $request->name   , 
            'display_name'  => $request->display_name,
            'description'   => $request->description,
        ]);

        Session::flash('success-message', 'Role updated successfully');

        return redirect()->route('rolesIndex');
    }

    public function delete($id){
        Role::where('id', $id)->delete();
        Session::flash('success-message', 'Role deleted successfully *disable muna ang delete');
        return redirect()->route('rolesIndex');
    }

}
