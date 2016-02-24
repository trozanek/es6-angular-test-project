let UserService = function($resource, $q, $location){
    
    let resource = $resource(`http://${$location.host()}:8080/users/:id`, {id: '@id'});
    
    this.user = {};
    
	this.getUser = () => {
		let deferred = $q.defer();
        
        if (this.user._id) {
            deferred.resolve(this.user);
        } else {
            this.fetchUser().then(response => {
                deferred.resolve(response);
            });
        }
        
        return deferred.promise;
	};
    
    this.fetchUser = () => {
        const userId = '562a1a832288e1bc0f41ba28';
        console.log('Fetching user data');
        let deferred = $q.defer();
        
        resource.get({id: userId}).$promise.then(response => {
            this.user = response;
            deferred.resolve(response);
        });
        return deferred.promise;
    };
};



export default UserService; 