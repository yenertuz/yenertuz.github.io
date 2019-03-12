import React from 'react';
import ReactDOM from 'react-dom';
import environment from "../environment";
import sort_projects from "./sort_projects";

class List extends React.Component {
	render() {
		var get_target = (string) => {
			if (string == "Email")
				return ("_self");
			else
				return ("_blank");
		};

		var handle_preview = (event, element) => {
			environment.selected = element;
			event.preventDefault();
			environment.refresh();
		}

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
			<input id="search-bar-input" type="text" placeholder="Search titles or keywords"
			onChange={ (e) => {
				e.preventDefault();
				environment.search = e.currentTarget.value;
				environment.refresh();
			} }
			></input>
			<img src={environment.search_symbol_source} width="30px" height="30px"></img>
		</div>;

		var ordered_projects = sort_projects(environment.projects, environment.search)

		var list_items = ordered_projects.map(
			(element, index) => {
				return (
					<div key={index} className="list-item" target="_blank">
					<i className={element.symbol_source}></i>
					<b>{element.title}</b>
					<i>{element.description}</i>
					<i title="Preview" className={environment.preview_symbol_source + " clickable"}
					onClick={(e) => { handle_preview(e, element); }}></i>
					<i className={environment.new_tab_symbol_source + " clickable"}
				onClick={() => {window.open(element.destination, "_blank")}}
				></i>
					</div>
				)
			}
		)

		return (<div id="main">
			<div className="sticky"><div className="header-container">{header}</div>
			{search_bar}</div>
			<div className="list-container">{list_items}</div>
		</div>);
	}
}

export default List;
