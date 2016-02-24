class NavbarController {
    constructor(UserService){
        UserService.getUser().then(user => {
            this.user = user;
        });
    }
}

export default NavbarController;