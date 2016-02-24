let AddonsFactory = ($resource) => {
    let resource = $resource('http://localhost:8080/accounts/:id', {id: '@id'}, {
        'update': {
            method: 'PUT'
        } 
    });
    
    return resource;
}

export default AddonsFactory; 