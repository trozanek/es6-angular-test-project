import angular from 'angular';
import 'angular-ui-router';
import ngResource from 'angular-resource';
import addonsComponent from './addons.component';
import addonsFactory from './service/addons.factory';
import addonsLsFactory from './service/addons.ls.factory';
import addonsNewFactory from './service/addons.new.factory';
import addonsService from './service/addons.service';


let addonsModule = angular.module('addons', [
	'ui.router',
    'app.common',
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
.factory('AddonsLsFactory', addonsLsFactory)
.factory('AddonsNewFactory', addonsNewFactory)
.service('AddonsService', addonsService);

export default addonsModule;