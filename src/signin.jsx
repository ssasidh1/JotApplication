import styles from "./sigin.module.css"

export function Signin(){


    return(
    <sections className={styles["sigin-section"]}>
        <div className={styles["signIn"]}>
            <h3 className={styles["welcome"]}>Welcome back !!!</h3>
            <form className={styles["signinform"]}>
                <label className={styles["UserName"]}>Create new account</label>
                <input className={styles["uname"]} placeholder="Username"></input>
                <input className={styles["password"]} placeholder="Password"></input>
                <button className={styles["submit"]} type="submit">LOG IN</button>
                
            </form>
            <div className={styles["newacnt"]}>
                <a href="#">Forgot password?</a>
                <p className={styles["p-create"]}>Don't have an account?</p>
                <button className={styles["btn-create"]}>CREATE NEW</button>
            </div>
        </div>
    </sections>
    )
}