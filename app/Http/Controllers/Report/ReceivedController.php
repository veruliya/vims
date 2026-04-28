<?php

namespace App\Http\Controllers\Report;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use Inertia\Inertia;

class ReceivedController extends Controller
{
    public function index()
    {
        return Inertia::render('report/received/index');
    }

    public function create()
    {
        return Inertia::render('report/received/create');
    }
}
