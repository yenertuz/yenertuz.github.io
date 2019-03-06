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

		var header = environment.header.map(
			(element, index) => {
				return (
				<div key={index} className="header-item">
				<a href={element.destination} target={get_target(element.tooltip)}>
				<img src={element.symbol_source} title={element.tooltip} 
				height={environment.navbar_image_height} width={environment.navbar_image_width}></img>
				</a></div>
				);
			}
		)

		var search_bar = <div className="search-container">
			<input id="search-bar-input" type="text"></input>
			<img src={environment.search_symbol_source} width="30px" height="30px"></img>
		</div>;

		var list_items = environment.projects.map(
			(element, index) => {
				return (
					<div key={index} className="list-item" target="_blank">
					<i className={element.symbol_source}></i>
					<b>{element.title}</b>
					<i>{element.description}</i>
					<img src={environment.new_tab_symbol_source} title={element.tooltip} 
				height={environment.navbar_image_height} width={environment.navbar_image_width}
				href={element.destination} target="_blank"
				></img>
					</div>
				)
			}
		)

		return (<div>
			<div className="header-container">{header}</div>
			{search_bar}
			<div className="list-container">{list_items}</div>
		</div>);
	}
}

export default List;