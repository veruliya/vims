<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Api\StoreItemController;
use App\Http\Controllers\Api\TransactionReportController;
use App\Http\Controllers\Api\MovementController;

Route::apiResource('store-items', StoreItemController::class);
Route::apiResource('transaction-reports', TransactionReportController::class);
Route::apiResource('movements', MovementController::class);

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
