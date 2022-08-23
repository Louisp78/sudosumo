import AuthService from "./../services/auth";
import {useAuthState} from "react-firebase-hooks/auth";
import "./Login.css";
import {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import React from "react";
import {ClipLoader} from "react-spinners";

function Login() {
    const authService = new AuthService();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [user, loading, error] = useAuthState(authService.auth);
    const navigate = useNavigate();
    useEffect(() => {
        if (loading) {
            // maybe trigger a loading screen
            return;
        }
        if (user) navigate("/dashboard");
    }, [user, loading]);
    return (
        <div>

            <div className="login">
                <div className="login__container">
                    <input
                        type="text"
                        className="login__textBox"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="E-mail Address"
                    />
                    <input
                        type="password"
                        className="login__textBox"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                    />
                    <button
                        className="login__btn"
                        onClick={() => authService.signInWithEmailAndPassword(email, password)}
                    >
                        Login
                    </button>
                    <button className="login__btn login__google" onClick={authService.signInWithGoogle}>
                        Login with Google
                    </button>
                    <div>
                        <ClipLoader color={"darkorange"} loading={loading} size={50}/>
                    </div>
                    <div>
                        <Link to="/reset">Forgot Password</Link>
                    </div>
                    <div>
                        Don't have an account? <Link to="/register">Register</Link> now.
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;