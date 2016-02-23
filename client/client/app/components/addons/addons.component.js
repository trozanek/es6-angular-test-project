import template from './addons.html!text';
import controller from './addons.controller';
import './addons.css!';

let addonsComponent = function(){
	return {
		template,
		controller,
		restrict: 'E',
		controllerAs: 'vm',
		bindToController: true
	};
};

export default addonsComponent;
