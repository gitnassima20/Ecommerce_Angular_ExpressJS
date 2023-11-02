export interface User {
    _id?: string;
    name?:string;
    email?:string;
    password?:string
    adresse?:string,
    city?:string,
    country?:string,
    phone?:string,
    isAdmin?:boolean;
}
export interface ResUsers{
    success?: boolean;
    users: User[];
}
export interface ResOneUsers{
    success?: boolean;
    user: User
}