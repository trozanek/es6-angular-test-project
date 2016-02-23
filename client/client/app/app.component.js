import template from './app.html!text';
import 'twbs/bootstrap/css/bootstrap.css!';
import './app.css!';

let appComponent = ()=>{
	return {
		template,
		restrict: 'E'
	};
};

export default appComponent;
