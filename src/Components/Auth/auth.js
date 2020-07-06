//Currently not used in lieu of checking redux for role and login status
class Auth {
    constructor() {
        this.admin = false;
        this.client = false;
        this.authenticated = false;
    }
  
    //The idea is that you use this to set variables to true upon login then calls the login function afterwards
    loginAdmin(callBackFN) {
        this.admin = true;
        this.authenticated = true;
        callBackFN();
    }

    loginClient(callBackFN) {
        this.client = true;
        this.authenticated = true;
        callBackFN();
    }
  
    //Then false when you logout
    logout(callBackFN) {
        this.admin = false;
        this.client = false;
        this.authenticated = false;
        callBackFN();
    }
  
    //Functions that allow you to check if you're logged in addition to checking your role
    isAuthenticated() {
        return this.authenticated;
    }

    isAuthenticatedAdmin() {
        return this.admin;
    }

    isAuthenticatedClient() {
        return this.client;
    }
  }
  
export default new Auth();
  