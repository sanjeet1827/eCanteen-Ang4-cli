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
    selectedSite: number;
}

/* Defines the SignUp entity */
export class SignIn {
    email: string;
    password: string;
    authenticated: boolean;
}

