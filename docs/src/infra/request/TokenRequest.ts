export class TokenRequest {
    code: string;
    state: string;

    constructor(code: string, state: string) {
        this.code = code;
        this.state = state;
    }
}