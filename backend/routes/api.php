<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Http;

Route::get('/test', function () {
    return response()->json([
        'message' => 'API test is working!'
    ]);
});

// Current weather route
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

// Forecast route
Route::get('/weather/forecast', function (Request $request) {
    $city = $request->query('city', 'London');
    $apiKey = env('OPENWEATHERMAP_API_KEY');
    
    try {
        // First get coordinates for the city
        $currentResponse = Http::withoutVerifying()->get('https://api.openweathermap.org/data/2.5/weather', [
            'q' => $city,
            'appid' => $apiKey,
            'units' => 'metric',
        ]);
        
        if (!$currentResponse->successful()) {
            return response()->json([
                'error' => 'Failed to fetch city coordinates',
                'status' => $currentResponse->status()
            ], 500);
        }
        
        $currentData = $currentResponse->json();
        $lat = $currentData['coord']['lat'];
        $lon = $currentData['coord']['lon'];
        
        // Then get forecast data using coordinates
        $forecastResponse = Http::withoutVerifying()->get('https://api.openweathermap.org/data/2.5/forecast', [
            'lat' => $lat,
            'lon' => $lon,
            'appid' => $apiKey,
            'units' => 'metric',
        ]);
        
        if ($forecastResponse->successful()) {
            // Process and simplify forecast data
            $forecastData = $forecastResponse->json();
            
            // Group forecast data by day
            $dailyForecasts = [];
            $currentDay = null;
            
            foreach ($forecastData['list'] as $forecast) {
                $date = date('Y-m-d', $forecast['dt']);
                
                if ($date !== $currentDay && count($dailyForecasts) < 4) { // Get current day + 3 days
                    $currentDay = $date;
                    $dailyForecasts[$date] = $forecast;
                }
            }
            
            return response()->json([
                'city' => $forecastData['city'],
                'forecast' => array_values($dailyForecasts)
            ]);
        } else {
            return response()->json([
                'error' => 'Failed to fetch forecast data',
                'status' => $forecastResponse->status()
            ], 500);
        }
    } catch (\Exception $e) {
        return response()->json([
            'error' => 'An error occurred',
            'message' => $e->getMessage()
        ], 500);
    }
});

// Geocoding route
Route::get('/geocoding', function (Request $request) {
    $query = $request->query('q', '');
    $limit = $request->query('limit', 5); // Default to 5 results
    $apiKey = env('OPENWEATHERMAP_API_KEY');
    
    if (empty($query)) {
        return response()->json([
            'error' => 'Query parameter is required'
        ], 400);
    }
    
    try {
        $response = Http::withoutVerifying()->get('https://api.openweathermap.org/geo/1.0/direct', [
            'q' => $query,
            'limit' => $limit,
            'appid' => $apiKey
        ]);
        
        if ($response->successful()) {
            return response()->json($response->json());
        } else {
            return response()->json([
                'error' => 'Failed to fetch geocoding data',
                'status' => $response->status()
            ], 500);
        }
    } catch (\Exception $e) {
        return response()->json([
            'error' => 'An error occurred',
            'message' => $e->getMessage()
        ], 500);
    }
});

// Coordinate-based weather routes
Route::get('/weather/current/coords', function (Request $request) {
    $lat = $request->query('lat');
    $lon = $request->query('lon');
    $apiKey = env('OPENWEATHERMAP_API_KEY');
    
    if (!isset($lat) || !isset($lon)) {
        return response()->json([
            'error' => 'Latitude and longitude are required'
        ], 400);
    }
    
    try {
        $response = Http::withoutVerifying()->get('https://api.openweathermap.org/data/2.5/weather', [
            'lat' => $lat,
            'lon' => $lon,
            'appid' => $apiKey,
            'units' => 'metric',
        ]);
        
        if ($response->successful()) {
            return response()->json($response->json());
        } else {
            return response()->json([
                'error' => 'Failed to fetch weather data',
                'status' => $response->status()
            ], 500);
        }
    } catch (\Exception $e) {
        return response()->json([
            'error' => 'An error occurred',
            'message' => $e->getMessage()
        ], 500);
    }
});

// Coordinate-based forecast routes
Route::get('/weather/forecast/coords', function (Request $request) {
    $lat = $request->query('lat');
    $lon = $request->query('lon');
    $apiKey = env('OPENWEATHERMAP_API_KEY');
    
    if (!isset($lat) || !isset($lon)) {
        return response()->json([
            'error' => 'Latitude and longitude are required'
        ], 400);
    }
    
    try {
        $forecastResponse = Http::withoutVerifying()->get('https://api.openweathermap.org/data/2.5/forecast', [
            'lat' => $lat,
            'lon' => $lon,
            'appid' => $apiKey,
            'units' => 'metric',
        ]);
        
        if ($forecastResponse->successful()) {
            // Process and simplify forecast data
            $forecastData = $forecastResponse->json();
            
            // Group forecast data by day
            $dailyForecasts = [];
            $currentDay = null;
            
            foreach ($forecastData['list'] as $forecast) {
                $date = date('Y-m-d', $forecast['dt']);
                
                if ($date !== $currentDay && count($dailyForecasts) < 4) {
                    $currentDay = $date;
                    $dailyForecasts[$date] = $forecast;
                }
            }
            
            return response()->json([
                'city' => $forecastData['city'],
                'forecast' => array_values($dailyForecasts)
            ]);
        } else {
            return response()->json([
                'error' => 'Failed to fetch forecast data',
                'status' => $forecastResponse->status()
            ], 500);
        }
    } catch (\Exception $e) {
        return response()->json([
            'error' => 'An error occurred',
            'message' => $e->getMessage()
        ], 500);
    }
});