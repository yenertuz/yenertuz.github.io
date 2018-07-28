<?php

system("git pull -f");

$json = json_decode(file_get_contents("status"));

print_r($json);

system("git add .");
system("git commit -m \"m\"");
system("git push");

?>
