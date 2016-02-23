import angular from 'angular';
import 'angular-ui-router';
import ngResource from 'angular-resource';
import addonsComponent from './addons.component';
import addonsFactory from './service/addons.factory';
import addonsService from './service/addons.service';

let addonsModule = angular.module('addons', [
	'ui.router',
    ngResource
])
.config(($stateProvider, $urlRouterProvider)=>{
	$urlRouterProvider.otherwise('/');
	
	$stateProvider
		.state('addons', {
			url: '/addons',
			template: '<addons></addons>'
		});
})
.directive('addons', addonsComponent)
.factory('AddonsFactory', addonsFactory)
.service('AddonsService', addonsService);

export default addonsModule;