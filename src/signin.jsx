import { useEffect, useRef, useState } from "react";
import styles from "./sigin.module.css"
import { useNavigate} from 'react-router-dom'
import { useUser } from './UserContext';
import { setUserInfo,getUserInfo } from "./storeUser";
export function Signin(){
const nav = useNavigate();
let Uname;
const { username, signIn, signOut } = useUser();
console.log("inside signin")
const signupPage = ()=>{
    nav('/jot/signup')
}
const uname = useRef();
const passw = useRef();

const homePage = async()=>{
    try{
        const userInfo = { 
            username:uname.current.value,
            password:passw.current.value
            };   
        console.log("username from signin",userInfo.username,userInfo.password)
        const res = await fetch(
            `https://fz7be10kxd.execute-api.us-east-1.amazonaws.com/notes`,
            {
                method:"POST",
                mode:"cors",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(userInfo)
            }
        );

        if(res.ok){
            const usname = await res.json();
            
            if(usname.message ==="success"){
                setUserInfo(userInfo.username)
                Uname = userInfo.username;
                signIn(Uname)
                console.log("usname",usname);
                nav('/jot/')
            }
    
        }

        else{
            console.error("failed to create");
        }
    } catch (error){
        console.error("error to create");
    } 
}  

    return(
    <sections className={styles["sigin-section"]}>
        <div className={styles["signIn"]}>
            <h3 className={styles["welcome"]}>Welcome back !!!</h3>
            <form className={styles["signinform"]}>
                <label className={styles["UserName"]}>Login to your account</label>
                <input ref={uname}className={styles["uname"]} placeholder="Username"></input>
                <input ref={passw} className={styles["password"]} placeholder="Password"></input>
                <button className={styles["submit"]} type="submit" onClick={()=>homePage()}>SIGN IN</button>
                
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
