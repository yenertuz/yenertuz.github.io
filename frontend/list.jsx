import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jQuery';
import environment from "../environment";

class List extends React.Component {
	render() {
		var get_target = (string) => {
			if (string == "Email")
				return ("_self");
			else
				return ("_blank");
		};

		var contents = environment.header.map(
			(element, index) => {
				return (
				<div key={index}>
				<a href={element.destination} target={get_target(element.tooltip)}>
				<img src={element.symbol_source} title={element.tooltip} 
				height={environment.navbar_image_height} width={environment.navbar_image_width}></img>
				</a></div>
				);
			}
		)

		var search_bar = <div></div>

		return (<div>
			{contents}
			{/* {search_bar()}
			{projects()} */}
		</div>);
	}
}

export default List;