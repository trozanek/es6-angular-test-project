import angular from 'angular';
import UserService from './user.service';

let userModule = angular.module('user', [])
	.service('UserService', UserService);
	
export default userModule; 