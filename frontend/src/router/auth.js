import { useUserStore } from "../stores/user";

const loginGuard = (to, from) => {
    const { userToken } = useUserStore();

    return !!userToken || { name: 'login' };
}

const roleGuard = (...roles) => (to, from) => {
    const { userToken } = useUserStore();
    if (!userToken) return false;

    return roles.includes(userToken.payload.role);
}

export { loginGuard, roleGuard };