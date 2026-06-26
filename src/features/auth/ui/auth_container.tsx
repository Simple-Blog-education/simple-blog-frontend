import { useCallback, useState } from "preact/hooks";
import { SignInForm } from "./sign_in_form";
import { SignUpForm } from "./sign_up_form";
import './auth_container.css'
import { useLocation } from "preact-iso";
import { signIn, signUp, type AuthCredentials, type SignUpData } from "../api/auth.api";
import { Notification } from "@/shared/ui";
import { useSignal } from "@preact/signals";

type CurrentForm = 'signin' | 'signup';

export function AuthContainer() {
    const [currentForm, setCurrentForm] = useState<CurrentForm>("signup")
    const { route } = useLocation();
    const [infoText, setInfoText] = useState<string | null>(null);

    const handleSignIn = useCallback(async (data: AuthCredentials) => {
        try {
            const success = await signIn(data);
            if (success) {
                route('/', true);
            }
            return success;
        }
        catch {
            return false;
        }

    }, [route]);

    const handleSignUp = useCallback(async (data: SignUpData) => {
        const { password, repeatPassword } = data;
        if (password !== repeatPassword) {
            throw new Error('Пароли не совпадают');
        }

        const success = await signUp({
            username: data.username,
            email: data.email,
            password: data.password
        })

        if (success) {
            setCurrentForm('signin');
            setInfoText('Регистрация успешна, войдите в систему');
        }

        return success;
    }, [])
    return (
        <section className={"auth"}>
            <h1>{currentForm == "signin" ? "Вход" : "Регистрация"}</h1>
            <Notification variant="info" text={infoText} />
            {currentForm == "signin" ?
                <SignInForm onSubmit={handleSignIn} onSwitch={() => setCurrentForm('signup')}></SignInForm> :
                <SignUpForm onSubmit={handleSignUp} onSwitch={() => setCurrentForm('signin')}></SignUpForm>}
        </section>

    );
}