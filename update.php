<?php

include("header.php");

system("git pull -f -q");

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
	$json = set_project($json, $argv[2], $argv[3]);
}
else if ($argv[1] == "log")
{
	$json = log_project($json, $argv[2], $argv[3]);
}
else if ($argv[1] == "delete")
{
	unset($json["projects"][$argv[2]]);
}
else if ($argv[1] == "nowork")
{
	$json["need_work"] = "";
}
else if ($argv[1] != "update")
{
	$json["return"] = "ERROR: ".$argv[1]." IS NOT A VALID COMMAND";
}

$json = erase_old_projects($json);

file_put_contents("json", json_encode($json));
write_to_index_html($json);

system("git add -q .");
system("git commit -m \"m\" -q");
system("git push -q");

echo($json["return"].PHP_EOL);

?>
