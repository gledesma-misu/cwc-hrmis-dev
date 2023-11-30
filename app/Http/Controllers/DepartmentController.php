<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Department;

use Session;

class DepartmentController extends Controller
{
    //below for VUE Js
    public getDepartments(){
        return response()->json(Department::latest()->get());
    }
    public function storeDepartment(Request $request){
        Department::create([
            'name'          => $request->name   , 
            'director_id'   => $request->director_id,
            'user_id'       => 1
        ]);

        return response()->json('success');
    } 


    //below is for laravel
    public function index(){
        $departments = Department::all();
        return view('management.departments.index', compact('departments'));
    }

    public function create(){
        return view('management.departments.create');
    }

    public function store(Request $request){


        $request->validate([
            'name'=> ['required'],
            'director_id' => ['required'],
        ]);

        Department::create([
            'name'          => $request->name   , 
            'director_id'   => $request->director_id,
            'user_id'       => 1
        ]);

        Session::flash('success-message', 'Department created successfully');

        return redirect()->route('departmentsIndex');
    }

    public function edit($id){
        $department = Department::find($id);
        return view('management.departments.edit', compact('department'));
    }

    public function update(Request $request, $id){
        $request->validate([
            'name'=> ['required'],
            'director_id' => ['required'],
        ]);

        Department::where('id', $id)->update([
            'name'          => $request->name   , 
            'director_id'   => $request->director_id
        ]);

        Session::flash('success-message', 'Department updated successfully');

        return redirect()->route('departmentsIndex');
    }

    public function delete($id){
        Department::where('id', $id)->delete();
        Session::flash('success-message', 'Department deleted successfully');
        return redirect()->route('departmentsIndex');
    }
}
