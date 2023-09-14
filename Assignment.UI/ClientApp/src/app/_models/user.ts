export class User {
    id?: number;
    username?: string;
    password?: string;
    token?: string;
    emailaddress?:string;
    lastname?:string;
    firstname?:string;
}

export class TokenResponse {
    userName?: string;
    token?: string;
    id?:number;
}