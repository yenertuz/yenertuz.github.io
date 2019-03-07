function sort_projects(array, search_string) {
	if (search_string == "") {
		return (array);
	}

	var new_array = [];

	function is_match(string1, string2=search_string) {
		var len1 = string1.length;
		var len2 = string2.length;
		if (len1 > len2) {
			len1 = len2;
		}
		var new1 = string1.substring(0, len1).toLowerCase();
		var new2 = string2.substring(0, len1).toLowerCase();
	
		if (new1 == new2) {
			return true;
		}
		return false;
	}

	function search_commas(comma_separated, search_string2=search_string) {
		if (search_string2 == "") {
			return true;
		}

		var array_of_values = comma_separated.split(", ");
		var array_len = array_of_values.length;
		for (var i = 0; i < array_len; i++) {
			if (is_match(array_of_values[i]) == true) {
				return true;
			}
		}
		return false;
	}

	array.forEach(
		(element) => {
			if (is_match(element.title, search_string)) {
				new_array.push(element);
			}
		}
	);

	var array_len = array.length;

	for (var i = 0; i < array_len; i++) {
		if (new_array.includes(array[i]) == false && 
			search_commas(array[i].description) == true ) {
				new_array.push(array[i]);
			}
	}

	// array.forEach(
	// 	(element) => {
	// 		if (new_array.includes(element) == false && 
	// 			search_commas(element.description) == true) {
	// 				new_array.push(element);
	// 			}
	// 	}
	// );

	return (new_array);

}

export default sort_projects ;