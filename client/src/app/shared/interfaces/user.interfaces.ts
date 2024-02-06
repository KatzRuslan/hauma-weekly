export interface IState {
    id: string;
    fullname: string;
    token: string;
    role: string;
}
export interface ICredential {
    username: string;
    password: string;
}

export interface IRegistration  {
    fullname: string;
    email: string;
    encoded: string;
    callback: (error?: { header: string; message: string }) => void;
}
export interface ICompleteRegistration {
    fullname: string;
    email: string;
    count: number;
    role: string;
    credentials: ICredential;
    callback: (error?: { header: string; message: string }) => void;
}