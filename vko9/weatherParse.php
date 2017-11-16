<?php

# Enable Error Reporting and Display:
error_reporting(~0);
ini_set('display_errors', 1);

$apiKey = "6970881be259734a6591cb2443463e52";
$location = "648900";
$units = "metric";

//get JSON
$json = file_get_contents("http://api.openweathermap.org/data/2.5/forecast?id=" . $location . "&units=" . $units . "&APPID=" . $apiKey);

//decode JSON to array
$data = json_decode($json,true);

//show data
//var_dump($data);

phpinfo();

$city = $data['city']['name'];
$day = $data['list'][0];
$date = $day['dt_txt'];
$weatherDesc = $day['weather'][0]['description'];
$temp = $day['main']['temp'];

//description
echo $city . " right now (" . $date . "): " . $weatherDesc . ", " . $temp . "C";

?>