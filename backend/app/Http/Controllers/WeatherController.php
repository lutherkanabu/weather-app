<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class WeatherController extends Controller
{
    public function test()
    {
        return response()->json([
            'message' => 'Weather API is working!'
        ]);
    }
}