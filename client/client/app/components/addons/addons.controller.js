
class AddonsController {
	constructor(AddonsService, AddonsFactory){
        let vm = this;
        this.addons = {};
        AddonsService.fetchAddons().then((response) => { 
            vm.addons = response;
        });  
	}
}


export default AddonsController;