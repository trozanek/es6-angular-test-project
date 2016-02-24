const SERVICE = new WeakMap();
const INIT = new WeakMap();

class AddonsController {
	constructor(AddonsService){
        SERVICE.set(this, AddonsService);
        INIT.set(this, () => {
            SERVICE.get(this).fetchAddons().then(response => {
                this.addons = SERVICE.get(this).addons;
                this.premiumAddons = SERVICE.get(this).premiumAddons;
            });
        });

        INIT.get(this)();
	}
        
    toggleAddon(id) {
        SERVICE.get(this).toggleAddon(id).then(response => {
            this.addons = SERVICE.get(this).addons;
        });
    }
    
    orderPremiumAddon(id) {
        SERVICE.get(this).orderPremiumAddon(id).then(response => {
            this.premiumAddons = SERVICE.get(this).premiumAddons;
            alert(`Thank you for ordering activation of ${id} premium feature. Our sales representative will contact you soon`);
        })
    }
}


export default AddonsController;