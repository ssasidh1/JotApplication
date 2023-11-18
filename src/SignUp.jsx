import styles from "./signup.module.css"
import { useRef } from "react";
import { useNavigate} from 'react-router-dom'

export function SignUp()
{
    const nav = useNavigate();
    let username= useRef(),password = useRef();
    
    const putData = async()=>{
        const userData = {
            username: username.current.value,
            password: password.current.value,
        };
       
        console.log("Signup",userData.username,userData.password)
        try
        {
            const res = await fetch(
                `https://fz7be10kxd.execute-api.us-east-1.amazonaws.com/notes`,
                {
                    method:"PUT",
                    mode:"cors",
                    headers:{
                        "Content-Type":"application/json"
                    },
                    body:JSON.stringify(userData)
                }
            );

            if(res.ok){
                nav("/jot/signin");
            }
            else{
                console.error("failed to create");
            }
        } catch (error){
            console.error("error to create",error);
        }
        
    };

    return(
    <sections className={styles["sigup-section"]}>
        <div className={styles["signUp"]}>
            <h3 className={styles["welcome"]}>Welcome to Jot</h3>
            <form className={styles["signupform"]} onSubmit={(e)=>e.preventDefault()}>
                <label className={styles["UserName"]}>Create new account</label>
                <input className={styles["uname"]} placeholder="Username" ref={username} required />
                <input className={styles["password"]} placeholder="Password" type = "password" ref= {password} required />
                <input className={styles["confirm-pass"]} placeholder="Confirm password" type="password" required  />
                <button className={styles["submit"]}  type="submit" onClick={putData}>SIGN UP</button>
            </form>
            <a href="#" className={styles["a-sign"]} onClick={()=>nav('/jot/signin')}>Already have an account?</a>
        </div>
        <div>
        
        </div>
     </sections>
    )
}