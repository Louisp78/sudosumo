export class ApiConfig {
    static readonly baseUrl = "http://localhost:8080";
    static readonly endpoint = {
        createUser: "/users/create",
        getAllUsers: "/users/all",
        getCurrentUser: "/users/current",
    }
}