let AddonsNewFactory = ($resource, $q, $location) => {
    let addons = [];
    
    let resource = $resource(`http://${$location.host()}:8080/addons/new`, {}, {
        get: {
            method: 'GET',
            isArray: true
        }
    });
    let fetchAddons = () => {
        let deferred = $q.defer();
        
        resource.get().$promise.then(response => {
            addons = response.map(item => {
                return item.id;
            });
            deferred.resolve(addons);
            
        });
        return deferred.promise;
    };
    
    let checkAddon = (id) => { 
        return addons.indexOf(id) > -1;
    };
    
    return { checkAddon, fetchAddons };
}

export default AddonsNewFactory; 