<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Permission;
use Session;
class PermissionController extends Controller
{
    //For Laravel
    public function index(){
        $permissions = Permission::all();
        return view('management.permissions.index', compact('permissions'));
    }

    public function create(){
        return view('management.permissions.create');
    }

}
