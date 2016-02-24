import loremIpsum from 'lorem-ipsum';
import AddonsFactory from './addons.factory';
import AddonsNewFactory from './addons.new.factory';
import _ from 'underscore';

let AddonsService = function AddonsService(AddonsFactory, UserService, AddonsLsFactory, AddonsNewFactory, $q) {
	
	this.addons = [];
    this.premiumAddons = [];
    
    this.orderPremiumAddon = (id) => {
        let deferred = $q.defer();
        let addon = _.findWhere(this.premiumAddons, {id: id});
        
        UserService.getUser().then(user => {
            var payload = {
                order: {
                    addon: addon,
                    action: !addon.enabled,
                    user: user
                }
            };
            
            AddonsFactory.update({id: user.accountId}, payload).$promise.then(response => {
                deferred.resolve();
            });
        });
        
        return deferred.promise;
    };
    
    this.toggleAddon = (id) => {
        let deferred = $q.defer();
        let addon = _.findWhere(this.addons, {id: id});
        let featuresPayload = {};
        
        addon.enabled = !addon.enabled;
        featuresPayload = buildFeaturesPayload(this.addons);
        UserService.getUser().then(user => {
            AddonsFactory.update({id: user.accountId}, featuresPayload).$promise.then(response => {
                deferred.resolve(); 
            });    
        });
        
        return deferred.promise;
    };
    
    this.fetchAddons = () => {
        let deferred = $q.defer();
        
        AddonsNewFactory.fetchAddons().then(() => {
            return UserService.getUser();
        }).then(user => {
            return AddonsFactory.get({id: user.accountId}).$promise; 
        }).then((response) => {
            let addons = mapFeatures(response.result.features, AddonsLsFactory);
            let premium = mapFeatures(response.result.premiumFeatures, AddonsLsFactory);
            
            this.addons = addons;
            this.premiumAddons = premium;
            
            deferred.resolve();
        }).catch((err) => {
            deferred.reject(err);
        });
        
        return deferred.promise;
    };
    
	this.getAddon = (id) => {
        var addon = {};
        this.addons.forEach((item) => {
            if (item.id === id) {
                addon = item;
            }
        })
		return addon;	
	};
    
    this.getAddons = () => {
        this.fetchAddons();
        return this.addons;
    }
};

function humanizeString (text) {
    let result = text.replace( /([A-Z])/g, " $1" );
    return result.charAt(0).toUpperCase() + result.slice(1);
};

function buildFeaturesPayload (addons) {
    var payload = {
        features : {}
    };
    
    addons.forEach(item => {
        payload.features[item.id] = item.enabled
    });
    
    return _.pick(payload, 'features');
};

function mapFeatures (features, lsFactory) {
    let result = Object.keys(features).map((key) => {
        return {
            id: key,
            name: humanizeString(key),
            desc: loremIpsum(),
            enabled: features[key],
            isNew: lsFactory.checkNew(key)
        }
    });
    return result;
};

export default AddonsService;