<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Report\ReceivedController;

Route::inertia('/', 'welcome')->name('welcome');

Route::prefix('report')->group(function () {
    Route::prefix('received')->controller(ReceivedController::class)->group(function () {
        Route::get('/', 'index')->name('report.received.index');
        Route::get('create', 'create')->name('report.received.create');
    });
});
