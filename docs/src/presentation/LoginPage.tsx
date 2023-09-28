import React from 'react';

export const LoginPage = () => {
    return (
        <div>
            <h1>Login Page</h1>
            <button onClick={() => window.location.href = process.env.REACT_APP_GOOGLE_LOGIN_BACKEND_URL!}>Sign in with google</button>
        </div>
    )
}

export default LoginPage;