import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jQuery';
import environment from "../environment";

class Detail extends React.Component {
	revert_preview() {
		environment.selected = "";
		environment.refresh();
	}
	
	render () {

		var video_class = "fas fa-video";
		var pointer_class = "fas fa-hand-pointer";
		if (environment.tab == 1) {
			pointer_class += " selected-tab";
		}
		else {
			video_class += " selected-tab";
		}

		var content;

		if (environment.tab == 1) {
			content = <iframe src={environment.selected.destination} width="100%" height="500px"></iframe>;
		}
		else {
			content = <img className="content-gif" src={environment.selected.image_source} width="100%" height="500px"></img>;
		}
	
		var switch_tabs = () => {
			if (environment.tab == 1) {
				environment.tab = 0;
			}
			else {
				environment.tab = 1;
			}
			environment.refresh();
		}

		var header_container = <div className="header-container">
		<i className={environment.back_symbol_source}
		onClick = { () => { environment.selected = ""; 
		environment.tab = 0;
		environment.search = ""; 
		environment.refresh(); } } 
		></i>
		<span>{environment.selected.title}</span>
		<i className={video_class} onClick={switch_tabs}></i>
		<i className={pointer_class} onClick={switch_tabs}></i>
		<img src={environment.new_tab_symbol_source}
		height={environment.navbar_image_height}
		width={environment.navbar_image_width} />
		</div>
		
		return (
			<div id="main">
				{header_container}
				{content}
			</div>
		);
	}
}

export default Detail ;