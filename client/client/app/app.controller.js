const USER = new WeakMap();
const INIT = new WeakMap();

class AddonsController {
	constructor(UserService){
        USER.set(this, UserService);
        INIT.set(this, () => {
            USER.get(this).getUser().then(response => {
                this.user = USER.get(this).user;
                console.log(`Authorized user ${this.user._id}`);
            });
        });

        INIT.get(this)();
	}
}


export default AddonsController;