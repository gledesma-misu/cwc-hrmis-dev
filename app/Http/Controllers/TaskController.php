<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Task;
use Illuminate\Auth\Access\Response;

class TaskController extends Controller
{
    public function tasksIndex(){

        return view('tasks.index');
    }
    public function getTasks(){
        $user_id = auth('api')->user()->id;
        return Response()->json(Task::where('user_id', $user_id)->with('users')->latest()->paginate(10));
    }
    public function storeTask(Request $request){
        $request->validate([
            'title'       => ['required'],
            'priority'    => ['required'],
            'start_date'  => ['required'],
            'end_date'    => ['required'],
            'description' => ['required'],
            'assign_to'   => ['required','array'],
        ]);

        $task = Task::create([
            'user_id'   =>  auth()->user()->id,
            'department_id'   =>  auth()->user()->department_id,
            'title'   =>  $request->title,
            'priority'   =>  $request->priority,
            'start_date'   =>  $request->start_date,
            'end_date'   =>  $request->end_date,
            'description'   =>  $request->description,
        ]);

        $task->users()->sync( $request->assign_to);
        return response()->json('success');

        
    }
    public function updateTask(Request $request, $id){
        $request->validate([
            'title'       => ['required'],
            'priority'    => ['required'],
            'start_date'  => ['required'],
            'end_date'    => ['required'],
            'description' => ['required'],
            'assign_to'   => ['required','array'],
        ]);

        $task = Task::findOrFail($id);

       Task::where('id', $id)->update([
            'title'   =>  $request->title,
            'priority'   =>  $request->priority,
            'start_date'   =>  $request->start_date,
            'end_date'   =>  $request->end_date,
            'description'   =>  $request->description,
        ]);

        $task->users()->sync( $request->assign_to);
        return response()->json('success');
    }

    public function deleteTask($id){
        $task = Task::findOrFail($id);
        $task->users()->detach();
        $task->delete();
        return response()->json('success');
    }
}
