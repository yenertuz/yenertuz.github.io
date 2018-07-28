<?php

system("git pull -f");

$json = json_decode(file_get_contents("json"));

date_default_timezone_set("America/Los_Angeles");
$tmp = date('d.m.Y, H:i:s');

$json["last_update"] = $tmp;

//print_r($json);

file_put_contents("json", json_encode($json));

system("git add .");
system("git commit -m \"m\"");
system("git push");

?>
