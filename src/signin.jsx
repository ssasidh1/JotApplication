import styles from "./sigin.module.css"
import { useNavigate } from 'react-router-dom'
export function Signin(){
const nav = useNavigate();
const signupPage = ()=>{
    nav('/jot/signup')
} 

    return(
    <sections className={styles["sigin-section"]}>
        <div className={styles["signIn"]}>
            <h3 className={styles["welcome"]}>Welcome back !!!</h3>
            <form className={styles["signinform"]}>
                <label className={styles["UserName"]}>Login to your account</label>
                <input className={styles["uname"]} placeholder="Username"></input>
                <input className={styles["password"]} placeholder="Password"></input>
                <button className={styles["submit"]} type="submit">SIGN IN</button>
                
            </form>
            <div className={styles["newacnt"]}>
                <a href="#">Forgot password?</a>
                <p className={styles["p-create"]}>Don't have an account?</p>
                <button className={styles["btn-create"]} onClick={signupPage}>CREATE NEW</button>
            </div>
        </div>
    </sections>
    )
}