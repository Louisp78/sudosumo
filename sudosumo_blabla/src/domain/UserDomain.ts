class UserDomain {
    id: number;
    score: number;
    firstName: string;
    lastName: string;
    email: string;
    username: string;

    constructor(id: number, score: number, firstName: string, lastName: string, email: string, username: string) {
        this.id = id;
        this.score = score;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.username = username;
    }
}