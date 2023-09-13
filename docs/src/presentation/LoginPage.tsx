import React, {useState} from 'react';

import {CredentialResponse, GoogleLogin} from '@react-oauth/google';
import {useCreateUserMutation} from "../infra/ApiSlice";
import {TokenRequest} from "../infra/request/TokenRequest";

export const LoginPage = () => {

    const [token, setToken] = useState<string>();
    const [createUser, {isLoading: isCreating}] = useCreateUserMutation();

    const onSuccessLogin = async (credentialResponse: CredentialResponse) => {
        if (credentialResponse.credential != null) {
            let currentToken: TokenRequest;
            currentToken = {
                token: credentialResponse.credential
            }
            const responseObject  = await createUser(currentToken);
            console.log(responseObject);
        } else
            console.log("No token found");
    };
    const onErrorLogin = () => console.log('Login Failed')

    return (
        <GoogleLogin onSuccess={onSuccessLogin} onError={onErrorLogin}/>
    )
}

export default LoginPage;