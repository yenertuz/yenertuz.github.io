<?php

function	get_timestamp()
{
	date_default_timezone_set('America/Los_Angeles');
	return (date('d.m.Y, H:i:s'));
}

function	set_project($json, $project_name, $project_status)
{
	if ($project_status != "assigned" && $project_status != "working"
			&& $project_status != "review" && $project_status != "finished")
	{
		$json["return"] = "ERROR: ".$project_status." IS AN INVALID PROJECT STATUS";
		return ($json);
	}
	$json["projects"][$project_name]["status"] = $project_status;
	$json["projects"][$project_name]["timestamp"] = get_timestamp();
	return ($json);
}

function	log_project($json, $project_name, $description)
{
	if (isset($json["projects"][$project_name]) == 0)
	{
		$json["return"] = "ERROR: ".$project_name." NOT A PROJECT";
		return($json);
	}
	$json["projects"][$project_name]["timestamp"] = get_timestamp();
	$json["projects"][$project_name]["log"][] = $description;
	return ($json);
}

function datediffInWeeks($date1, $date2)
{
    if($date1 > $date2)
	{
		return (datediffInWeeks($date2, $date1));
	}
    $first = DateTime::createFromFormat('m/d/Y', $date1);
    $second = DateTime::createFromFormat('m/d/Y', $date2);
    return (floor($first->diff($second)->days/7));
}

function	erase_old_projects($json)
{
	foreach ($json["projects"] as $key=>$value)
	{
		if (datediffInWeeks($json["projects"][$key]["timestamp"], get_timestamp()) != 0)
		{
			unset($json["projects"][$key]);
		}
	}
	return ($json);
}

?>
