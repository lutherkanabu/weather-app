<?php
use App\Http\Controllers\WeatherController;

Route::get('/test', [WeatherController::class, 'test']);