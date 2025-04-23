<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Http;

Route::get('/test', function () {
    return response()->json([
        'message' => 'API test is working!'
    ]);
});

Route::get('/weather/current', function (Request $request) {
    $city = $request->query('city', 'London');
    $apiKey = env('OPENWEATHERMAP_API_KEY');
    
    try {
        $response = Http::withoutVerifying()->get('https://api.openweathermap.org/data/2.5/weather', [
            'q' => $city,
            'appid' => $apiKey,
            'units' => 'metric',
        ]);
        
        if ($response->successful()) {
            return response()->json($response->json());
        } else {
            return response()->json([
                'error' => 'Failed to fetch weather data',
                'status' => $response->status(),
                'body' => $response->body()
            ], 500);
        }
    } catch (\Exception $e) {
        return response()->json([
            'error' => 'An error occurred',
            'message' => $e->getMessage()
        ], 500);
    }
});