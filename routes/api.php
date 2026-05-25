<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Api\StoreItemController;
use App\Http\Controllers\Api\ReceivedReportController;

Route::apiResource('store-items', StoreItemController::class);
Route::apiResource('received-report', ReceivedReportController::class);

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
