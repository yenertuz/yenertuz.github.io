<?php

include("header.php");

system("git pull -f");

$json = json_decode(file_get_contents("json"), true);

$json["timestamp"] = get_timestamp();

$json["return"] = "OK";

//print_r($json);

if ($argv[1] == "needwork")
{
	$json["need_work"] = get_timestamp();
}
else if ($argv[1] == "set")
{
	set_project($json, $argv[2], $argv[3]);
}
else if ($argv[1] == "log")
{
	log_project($json, $argv[2], $argv[3]);
}
else
{
	$json["return"] = "ERROR: ".$argv[1]." IS NOT A VALID COMMAND";
}

$json = erase_old_projects($json);

file_put_contents("json", json_encode($json));

system("git add .");
system("git commit -m \"m\"");
system("git push");

echo($json["return"].PHP_EOL);

?>
