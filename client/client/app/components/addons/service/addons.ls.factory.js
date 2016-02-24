let AddonsLsFactory = (AddonsNewFactory) => {
    let ls = window.localStorage;
    
    let updateAddon = (addonId) => {
        let addonName = `socialhub-addon-${addonId}`;
        let addonDisplays = parseInt(ls.getItem(addonName), 10) || 0;
        ls.setItem(addonName, addonDisplays + 1);
    };
    
    let checkNew = (addonId) => {
        if (AddonsNewFactory.checkAddon(addonId)) {
            let addonName = `socialhub-addon-${addonId}`;
            let addonDisplays = parseInt(ls.getItem(addonName), 10);
            updateAddon(addonId);
            return addonDisplays < 20;    
        } else {
            return false;
        }
    };
    
    return { checkNew, updateAddon };
}

export default AddonsLsFactory; 