import template from './app.html!text';
import 'twbs/bootstrap/css/bootstrap.css!';
import controller from './app.controller';
import './app.css!';

let appComponent = ()=>{
	return {
		template,
        controller,
		restrict: 'E'
	};
};

export default appComponent;
