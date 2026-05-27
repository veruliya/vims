<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\ReceivedReportController;

Route::inertia('/', 'welcome')->name('welcome');

Route::prefix('reporting')->group(function () {
    Route::prefix('received-reports')->controller(ReceivedReportController::class)->group(function () {
        Route::get('/', 'index')->name('report.received.index');
        Route::post('/', 'store')->name('report.received.store');
        Route::get('create', 'create')->name('report.received.create');
        Route::get('/{id}', 'show')->name('report.received.show');
    });
});
