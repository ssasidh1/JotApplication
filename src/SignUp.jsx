import styles from "./signup.module.css"

export function SignUp(){


    return(
    <sections className={styles["sigup-section"]}>
        <div className={styles["signUp"]}>
            <h3 className={styles["welcome"]}>Welcome to Jot</h3>
            <form className={styles["signupform"]}>
                <label className={styles["UserName"]}>create new account</label>
                <input className={styles["uname"]} placeholder="Username"></input>
                <input className={styles["password"]} placeholder="Password"></input>
                <input className={styles["confirm-pass"]} placeholder="Confirm password"></input>
                <button className={styles["submit"]} type="submit">SIGN IN</button>
            </form>
        </div>
    </sections>
    )
}