import { useCallback, useState } from "preact/hooks";
import { SignInForm } from "./sign_in_form";
import { SignUpForm } from "./sign_up_form";

export type ChangeAuthPageFunction = () => void;

export function Auth() {
    const [currentPage, setCurrentPage] = useState("signup")
    const changeToSignIn: ChangeAuthPageFunction = useCallback(() => {
        setCurrentPage("signin")
    }, [currentPage])
    const changeToSignUp: ChangeAuthPageFunction = useCallback(() => {
        setCurrentPage("signup")
    }, [currentPage])
    return  (
        currentPage == "signin" ? 
        <SignInForm changeCallback={changeToSignUp}></SignInForm> : 
        <SignUpForm changeCallback={changeToSignIn}></SignUpForm>
    );
}