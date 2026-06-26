import { Button, Input, Notification, Text } from "@/shared/ui";
import { useEffect, useState } from "preact/hooks";
import { useProfileForm } from "../hooks/use_profile_form";
import { AvatarUploader } from "./avatar_uploader";

import './edit_profile_form.css';

export function EditProfileForm() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [infoText, setInfoText] = useState('');

    const { initialData, isFetching, fetchError, submit, loading, error } = useProfileForm();

    useEffect(() => {
        if (initialData.value) {
            setFirstName(initialData.value.first_name || '');
            setLastName(initialData.value.last_name || '');
            setEmail(initialData.value.email || '');
        }
    }, [initialData.value])

    const handleSubmit = async (e: Event) => {
        e.preventDefault();
        if (!initialData.value) return;
        await submit({
            id: initialData.value.id,
            first_name: firstName,
            last_name: lastName,
            email: email
        })
        if (!error.value) setInfoText("Профиль обновлен");
    }
    if (isFetching.value) return <Text variant="ui">Загрузка...</Text>
    if (fetchError.value) return <Text variant="ui">Ошибка загрузки: {error.value}</Text>
    return (
        <form className={"edit-profile-form"} onSubmit={handleSubmit}>
            <AvatarUploader />
            <Input name="firstName" label="Имя" value={firstName} onInput={setFirstName} />
            <Input name="lastName" label="Фамилия" value={lastName} onInput={setLastName} />
            <Input type="email" label="E-mail" name="email" value={email} onInput={setEmail} />
            <Button type="submit" loading={loading.value}>Сохранить</Button>
            <Notification variant="error" text={error.value} />
            <Notification variant="info" text={infoText} />
        </form>
    )
}