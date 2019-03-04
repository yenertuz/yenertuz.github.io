import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jQuery';
import environment from "./environment";

class Root extends React.Component {
	render() {
		return (<p>{JSON.stringify(environment)}</p>);
	}
}

document.addEventListener("DOMContentLoaded", () => {
	const root = document.getElementById("root");
	ReactDOM.render(<Root/>, root);
  });