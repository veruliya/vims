<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Api\StoreItemController;
use App\Http\Controllers\Api\ReceivedReportController;
use App\Http\Controllers\Api\MovementController;

Route::apiResource('store-items', StoreItemController::class);
Route::apiResource('received-reports', ReceivedReportController::class);
Route::apiResource('movements', MovementController::class);

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
