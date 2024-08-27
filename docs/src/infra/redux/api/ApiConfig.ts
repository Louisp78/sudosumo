export class ApiConfig {
    static readonly baseUrl = import.meta.env.VITE_APP_BACKEND_URL!;
    static readonly endpoint = {
        createUser: "/users/create",
        getAllUsers: "/users/all",
        getCurrentUser: "/users/current",
    }

    static readonly handleUnauthorized = () => {
        //TODO: uncomment !!
        /*if (window.location.pathname !== "/login")
            window.location.href = "/login";*/
    }
}