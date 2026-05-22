import { isAuthenticated } from '@/features/auth';
import { useLocation } from 'preact-iso';
import type { ComponentType } from 'preact';

interface ProtectedRouteProps {
    component: ComponentType<any>;
    [key: string]: any;
}

export function ProtectedRoute({ component: Comp, ...rest }: ProtectedRouteProps) {
    const location = useLocation();

    if (!isAuthenticated.value) {
        location.route('/auth');
        return null;  // или <Redirect to="/auth" />, если preact-iso предоставляет такой компонент
    }

    return <Comp {...rest} />;
}