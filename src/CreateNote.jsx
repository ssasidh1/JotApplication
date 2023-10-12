import styles from "./createNote.module.css"
import { useState,useRef, useEffect } from "react"
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom'
import CreatableReactSelect from "react-select/creatable"
import { getTags, useLocalStorage } from "./useLocalStorage";
import {RichTextEditor} from "./RichTextEditor";
import parse from 'html-react-parser';
export function CreateNote(){

    
    const formRef = useRef(null)
    const navigate = useNavigate();
    const createOption= (label)=>({
        label,
        value:label,
    })
    const tagval  =getTags()
    const Defaultoptions=tagval ? tagval : [];
    const [isLoading, setIsLoading] = useState(false);
    const [Options, setOptions] = useState(Defaultoptions);
    const [value, setValue] = useState([]);
    const [body,setBody] = useState('');
   
    
    const handleSubmit =(e)=>{
        e.preventDefault();
        const initialValue = { title:formRef.current.title.value,
                    body:formRef.current.body.value,
                    keys:formRef.current.keys.value,
                    tags:value}
   
        useLocalStorage('data',initialValue)
        alert("Saved")

        
    }
    const handlechange=(e)=>{
        setValue(e);
        
    }

    const handleCreate = (inputValue)=>{
        setIsLoading(true);
        setTimeout(()=>{
            const newOpt = createOption(inputValue);
            setIsLoading(false);
            setOptions((prev)=>[...prev,newOpt]);
            setValue((prev)=>[...prev,newOpt]);
        },1000);
    }
    
    const setBodyContent=(e)=>{
        setBody(e.target.value)
    }
    return(
       <>
       <form className={styles['form-data']} onSubmit= {handleSubmit  } ref={formRef}>

        <label htmlFor="title" className={styles["name-label"]}>Start with a Title</label>
        <input  type="text" id="title" name="title" className={styles["name-input"] }  required/>

        <label  className={styles["tags"]}>Add tags</label>
        <CreatableReactSelect className={styles["creatable"]}  
        isClearable
        isDisabled={isLoading}
        isLoading={isLoading}
        isMulti 
        options={Options} 
        value={value} 
        onChange={handlechange}  
        onCreateOption={handleCreate} name="tags" />

        <label htmlFor="body" className={styles["body-label"]}>Jot it down</label>
        <textarea  className={styles["textarea"]} id="body" name="body" value={parse(body)}
        onChange={setBodyContent} required></textarea>

        <label htmlFor="keys"  className={styles["keypts-label"]}>Keys</label>
        <textarea  className={styles["textarea-keys"]} id="keys" name="keys" ></textarea>
        
           
        <input className={styles["save-btn"]} type="submit" disabled = {isLoading} value="Save" />
        
       
        <Link to ="..">
        <input className={styles["cancel-btn"]} type="submit" disabled = {isLoading} value="Cancel" />
        </Link>
       </form>
       {/* <RichTextEditor body={body} setBody={setBody}/> */}
       </>
       
    )
    
}