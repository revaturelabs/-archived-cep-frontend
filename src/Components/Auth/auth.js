class Auth {
    constructor() {
        this.admin = false;
        this.client = false;
        this.authenticated = false;
    }
  
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
  
    logout(callBackFN) {
        this.admin = false;
        this.client = false;
        this.authenticated = false;
        callBackFN();
    }
  
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
  