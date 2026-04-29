import { useCallback, useState } from "preact/hooks";
import { SignInForm } from "./sign_in_form";
import { SignUpForm } from "./sign_up_form";
import './auth_container.css'

export type ChangeAuthPageFunction = () => void;

export function Auth() {
    const [currentPage, setCurrentPage] = useState("signup")
    const changeToSignIn: ChangeAuthPageFunction = useCallback(() => {
        setCurrentPage("signin")
    }, [])
    const changeToSignUp: ChangeAuthPageFunction = useCallback(() => {
        setCurrentPage("signup")
    }, [])
    return  (
        <section className={"auth"}>
            <h1>{currentPage == "signin" ? "Вход" : "Регистрация"}</h1>
                {currentPage == "signin" ? 
            <SignInForm changeCallback={changeToSignUp}></SignInForm> : 
            <SignUpForm changeCallback={changeToSignIn}></SignUpForm>}
        </section>
        
    );
}