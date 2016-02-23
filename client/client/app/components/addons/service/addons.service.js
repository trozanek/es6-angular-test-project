import loremIpsum from 'lorem-ipsum';

let AddonsService = (AddonsFactory, $q) => {
	let addons = {};
	let humanizeString = (text) => {
        let result = text.replace( /([A-Z])/g, " $1" );
        return result.charAt(0).toUpperCase() + result.slice(1);
    };
    
    let fetchAddons = () => {
        let deferred = $q.defer();
        
        AddonsFactory.get({id: '562a1a83cb11b8bc0f07c5b4'}).$promise.then((response) => {
            var result = response.result.features;
            result = Object.keys(result).map((key) => {
                return {
                    id: key,
                    name: humanizeString(key),
                    desc: loremIpsum()
                }
            });
            console.log(AddonsService);
            deferred.resolve(result);
        }).catch((err) => {
            deferred.reject(err);
        });
        return deferred.promise;
    };
    
	let getAddon = (id) => {
        var addon = {};
        addons.forEach((item) => {
            if (item.id === id) {
                addon = item;
            }
        })
		return addon;	
	};
    
    let getAddons = () => {
        fetchAddons();
        return addons;
    }
	

	return { getAddon, fetchAddons, getAddons, addons };
};

export default AddonsService;