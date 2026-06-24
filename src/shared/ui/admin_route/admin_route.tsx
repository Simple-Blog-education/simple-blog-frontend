import { isAdmin } from "@/shared/lib/permissions";
import type { ComponentType } from "preact";
import { useLocation } from "preact-iso";

interface AdminRouteProps {
    component: ComponentType<any>;
    [key: string]: any;
}

export function AdminRoute({ component: Comp, ...rest }: AdminRouteProps) {
    const location = useLocation();
    if (!isAdmin.value) {
        location.route('/');
        return null;
    }
    return <Comp {...rest} />
}