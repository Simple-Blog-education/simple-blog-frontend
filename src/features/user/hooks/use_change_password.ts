import { createAsyncAction } from "@/shared/lib/create_async_action";
import { useEffect } from "preact/hooks";
import { changePassword, type PasswordChangeset } from "../api/user.api";

const changeAction = createAsyncAction(changePassword);

export function useChangePassword() {
    useEffect(() => changeAction.reset(), []);
    const submit = (data: PasswordChangeset) => {
        changeAction.execute(data);
    }
    return {
        submit,
        loading: changeAction.loading,
        error: changeAction.error
    }
}