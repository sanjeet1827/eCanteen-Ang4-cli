/* Defines the SignUp entity */
export class SignUp {
    name: string;
    contactNo: string;
    email: string;
    shopNo: string;
    password: string;
    logo: string;
    registerationPosted: boolean;
    alreadyRegistered: boolean;
    showLoginView: boolean;
    selectedSite: string;
}

/* Defines the Vendor entity */
export class Vendor {
    id: string;
    name: string;
    email: string;
    contact: string;
    password: string;
    shopNo: string;
    active: boolean;
    logo: string;
    siteId: string;
}

/* Defines the SignUp entity */
export class SignIn {
    email: string;
    password: string;
    authenticated: boolean;
}

