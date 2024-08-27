import { GoogleLogin } from '@react-oauth/google';

export const LoginPage = () => {
    return (
        <div>
            <h1>Login Page</h1>
            <button onClick={() => window.location.href = import.meta.env.VITE_APP_GOOGLE_LOGIN_BACKEND_URL!}>Sign in with google</button>
            <GoogleLogin
  onSuccess={credentialResponse => {
    console.log(credentialResponse);
  }}
  onError={() => {
    console.log('Login Failed');
  }}
/>
        </div>
    )
}

export default LoginPage;