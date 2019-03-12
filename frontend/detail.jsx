import React from 'react';
import ReactDOM from 'react-dom';
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
	
		function switch_tabs(n, e) {
			e.preventDefault();
			if (environment.tab == n) {
				return ;
			}
			environment.tab = n;
			environment.refresh();
		}

		var header_container = <div className="header-container">
		<i className={environment.back_symbol_source + " clickable"}
		onClick = { () => { environment.selected = ""; 
		environment.tab = 0;
		environment.search = ""; 
		environment.refresh(); } } 
		></i>
		<span>{environment.selected.title}</span>
		<i className={video_class + " clickable"} onClick={(e) => { switch_tabs(0, e); }}></i>
		<i className={pointer_class + " clickable"} onClick={(e) => { switch_tabs(1, e); }} ></i>
		<i className={environment.new_tab_symbol_source + " clickable"}/>
		</div>
		
		return (
			<div id="main">
				<div className="sticky">{header_container}</div>
				{content}
			</div>
		);
	}
}

export default Detail ;
