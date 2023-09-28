import {CredentialResponse} from "@react-oauth/google";

//const onErrorLogin = () => console.log('Unable to sign in and get the authorization code');
/*const onSuccessLogin = async (credentialResponse : CredentialResponse) => {
    console.log(credentialResponse.credential);
    if (credentialResponse.credential !== "" && credentialResponse.credential !== undefined) {
        console.log("credential response : ",credentialResponse);
        const response = await sendGoogleAuthCode({code: credentialResponse.credential});
        console.log("response : ", response);
        if ((response as {data: string}).data !== undefined) {
            setIsUserLogged(true);
        }
    }
}*/

/*const onSuccessCode = async (codeResponse : CodeResponse) => {
    console.log(codeResponse.code);
    if (codeResponse.code !== "" && codeResponse.code !== undefined) {
        console.log("code response : ",codeResponse);
        const response = await sendGoogleAuthCode({code: codeResponse.code, state: codeResponse.state!});
        console.log("response : ", response);
        if ((response as {data: string}).data !== undefined) {
            setIsUserLogged(true);
        }
    }
}*/
/*const login = useGoogleLogin({
    onSuccess: onSuccessCode,
    flow: "auth-code",
})*/

{/*<GoogleLogin onSuccess={onSuccessLogin} onError={onErrorLogin} />*/}
