import angular from 'angular';
import Home from './home/home'; 
import Addons from './addons/addons';

let componentModule = angular.module('app.components', [
	Home.name,
    Addons.name
]);

export default componentModule;