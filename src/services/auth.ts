import {
    GoogleAuthProvider,
    getAuth,
    signInWithPopup,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    signOut
} from "firebase/auth";

import {
    getFirestore,
    query,
    getDocs,
    collection,
    where,
    addDoc,
} from "firebase/firestore";


class AuthService {
    public auth: any;
    public db: any;
    private readonly googleProvider: any;

    constructor() {
        this.auth = getAuth();
        this.db = getFirestore();
        this.googleProvider = new GoogleAuthProvider();
    }

    async signInWithGoogle() {
        try {
            const res = await signInWithPopup(this.auth, this.googleProvider);
            const user = res.user;
            const q = query(collection(this.db, "users"), where("uid", "==", user.uid));
            const docs = await getDocs(q);
            if (docs.docs.length === 0) {
                await addDoc(collection(this.db, "users"), {
                    uid: user.uid,
                    name: user.displayName,
                    authProvider: "google",
                    email: user.email,
                });
            }
        } catch (err : any) {
            console.error(err);
            alert(err.message);
        }
    };

    async signInWithEmailAndPassword(email: string, password: string) {
        try {
            await signInWithEmailAndPassword(this.auth, email, password);
        } catch (err : any) {
            console.error(err);
            alert(err.message);
        }
    };

    async registerWithEmailAndPassword(name: string, email: string, password: string){
        try {
            const res = await createUserWithEmailAndPassword(this.auth, email, password);
            const user = res.user;
            await addDoc(collection(this.db, "users"), {
                uid: user.uid,
                name,
                authProvider: "local",
                email,
            });
        } catch (err : any) {
            console.error(err);
            alert(err.message);
        }
    };


    async sendPasswordReset(email: string) {
        try {
            await sendPasswordResetEmail(this.auth, email);
            alert("Password reset link sent!");
        } catch (err : any) {
            console.error(err);
            alert(err.message);
        }
    };

    logout() {
        return signOut(this.auth);
    };

    signUpPassword(email: string, password: string) {

        createUserWithEmailAndPassword(this.auth, email, password).then((userCredential) => {
            // Sign In
            const user = userCredential.user;
        }).catch((error) => {
// Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            const credential = error.credential;
            // ...
        });
    }
}

export default AuthService;