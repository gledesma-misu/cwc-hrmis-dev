@extends('layouts.master')

@section('content')
    <div class="card">
        <div class="card-header bg-dark">
            <h5 class="text-light">Update Role</h5>
        </div>
        <div class="card-body">
            <form action="{{ route('rolesUpdate', $roles->id) }}" method="POST">
                @csrf
                <div class="row">
                    <div class="col-md-4">
                        <div class="form-group">
                            <label for="name">Name</label>
                            <input type="text" class="form-control" name="name" value="{{$roles->name}}">
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group">
                            <label for="display_name">Display Name</label>
                            <input type="text" class="form-control" name="display_name" value="{{$roles->display_name}}">
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group">
                            <label for="description">Description</label>
                            <input type="text" class="form-control" name="description" value="{{$roles->description}}">
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-12">
                        <div class="form-group">
                            <button type="submit" class="btn btn-success float-right">
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
@endsection
