import { API } from "@/shared/api"

type AuthCredentials = {
    username: string,
    password: string
}

type SignUpData = {
    username: string,
    email: string,
    password: string
}

export async function signIn(data: AuthCredentials) {
    let authToken: string = await API.post('auth/login', data);
    API.defaultHeaders["Authorization"] = `Bearer: ${authToken}`;
}

export async function signUp(data: SignUpData) {
    let success = await API.post('auth/signup', data);
    if(success == "Success") console.log("Sign up successful");
    return true;
}