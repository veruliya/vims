<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\View\TransactionReport\ReceivedController;

Route::inertia('/', 'welcome')->name('welcome');

Route::prefix('transaction-report')->group(function () {
    Route::prefix('received')->controller(ReceivedController::class)->group(function () {
        Route::get('/', 'index')->name('transaction-report.index');
        Route::post('/', 'store')->name('transaction-report.store');
        Route::get('create', 'create')->name('transaction-report.create');
        Route::get('/{id}', 'show')->name('transaction-report.show');
    });
});
