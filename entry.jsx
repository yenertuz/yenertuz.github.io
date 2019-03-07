import React from 'react';
import ReactDOM from 'react-dom';
import environment from "./environment";
import List from "./frontend/list";
import Detail from "./frontend/detail";

class Root extends React.Component {

	constructor(props) {
		super(props);

		let this_component = this;
		environment.refresh = () => {
			this_component.setState({});
		};
	}

	render() {
		if (environment.selected == "")
			return (<List />);
		else
			return (<Detail />);
	}
}

document.addEventListener("DOMContentLoaded", () => {
	const root = document.getElementById("root");
	ReactDOM.render(<Root/>, root);
  });

  window.environment = environment;