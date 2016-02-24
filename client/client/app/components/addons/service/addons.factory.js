let AddonsFactory = ($resource, $location) => {
    let resource = $resource(`http://${$location.host()}:8080/accounts/:id`, {id: '@id'}, {
        'update': {
            method: 'PUT'
        } 
    });
    
    return resource;
}

export default AddonsFactory; 