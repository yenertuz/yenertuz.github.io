<?php

function	write_to_index_html($json)
{
	$to_write = "";
	$to_write .= file_get_contents("start");
	if ($json["need_work"] != "" && get_day_difference($json["need_work"], get_timestamp()) == 0)
	{
		$to_write .= "<div id=\"need_work\"><b>NEED WORK!</b></div><br>\n";
	}
	$to_write .= "<div id=\"last_updated\">LAST UPDATED: ".$json["timestamp"]."</div><br>\n";
	$to_write .= "<table width=\"100%\">\n";
	$to_write .= "<tr id=\"columns\"><th>STATUS</th><th>NAME</th><th>LAST UPDATE</th></tr>\n";
	foreach ($json["projects"] as $key=>$value)
	{
		$to_write .= "<tr>";
		$to_write .= "<td>".$value["status"]."</td>";
		$to_write .= "<td>".$key."</td>";
		$to_write .= "<td>".$value["timestamp"]."</td>";
		$to_write .= "</tr>\n";
	}
	$to_write .= "</table>\n";
	$to_write .= file_get_contents("end");
	file_put_contents("index.html", $to_write);
}

function	get_day_difference($date1, $date2)
{
	if ($date1 > $date2)
	{
		return (get_day_difference($date2, $date1));
	}
	$first = DateTime::createFromFormat('m.d.Y, H:i:s', $date1);
	$second = DateTime::createFromFormat('m.d.Y, H:i:s', $date2);
	return (floor($first->diff($second)->days));
}

function	get_timestamp()
{
	date_default_timezone_set('America/Los_Angeles');
	return (date('m.d.Y, H:i:s'));
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
    $first = DateTime::createFromFormat('m.d.Y, H:i:s', $date1);
    $second = DateTime::createFromFormat('m.d.Y, H:i:s', $date2);
    return (floor($first->diff($second)->days/7));
}

function	erase_old_projects($json)
{
	foreach ($json["projects"] as $key=>$value)
	{
		if (datediffInWeeks($json["projects"][$key]["timestamp"], get_timestamp()) != 0)
		{
			echo "ERASING ".$key." NOW\n";
			unset($json["projects"][$key]);
		}
	}
	return ($json);
}

?>
