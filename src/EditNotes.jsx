import styles from "./createNote.module.css"
import { useState,useRef, useEffect } from "react"
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from 'react-router-dom'
import CreatableReactSelect from "react-select/creatable"
import { updateStorage } from "./useLocalStorage";
import save1 from "/save1.png";
import cancel1 from "/cancel1.png";
export function EditNotes(){

    const loc = useLocation();
    const props = loc.state && loc.state.editData;
    console.log("edit props", props[1])
    const formRef = useRef(null)
    const navigate = useNavigate();
    const createOption= (label)=>({
        label,
        value:label,
    })
    let Defaultoptions=[
        { label:'css',value:'css'},
    ]
    if(props[1].tags.length !=0)
    Defaultoptions = [...Defaultoptions, props[1].tags]
    const [isLoading, setIsLoading] = useState(false);
    const [Options, setOptions] = useState(Defaultoptions);
    const [value, setValue] = useState([]);
    const [form, setForm] = useState({
        title:props[1].title,
        body:props[1].body,
        keys:props[1].keys,
    }
    )
   
    
    const handleSubmit =async (e)=>{
        e.preventDefault();
        const formValue = { 
            username:"s",
            noteValues:[{
            title:formRef.current.title.value,
            body:formRef.current.body.value,
            keys:formRef.current.keys.value,
            tags:value}]
            };      

    try
    {
        const res = await fetch(
            "https://fz7be10kxd.execute-api.us-east-1.amazonaws.com/notes",
            {
                method:"PUT",
                mode:"cors",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(formValue)
            }
        );

        if(res.ok){
            console.log("done")
        }
        else{
            console.error("failed to create");
        }
    } catch (error){
        console.error("error to create");
    }
    
        formRef.current.reset();
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
    
    const handleOnChange = (event) =>{
        const {name,value} = event.target;
        setForm((prev)=>({
            ...prev,
            [name]:value,
    }))
    }

    return(
       <>
       <form className={styles['form-data']} onSubmit= {handleSubmit  } ref={formRef}>

        <input  type="text" id="title" name="title" className={styles["name-input"] } value={form.title} onChange={handleOnChange} required/>

        <CreatableReactSelect className={styles["creatable"]}  
        isClearable
        isDisabled={isLoading}
        isLoading={isLoading}
        isMulti 
        options={Options} 
        value={value} 
        onChange={handlechange}  
        onCreateOption={handleCreate} name="tags" placeholder="#Tags" />

        <textarea  className={styles["textarea"]} id="body" name="body"  value = {form.body} onChange={handleOnChange} required></textarea>

        <textarea  className={styles["textarea-keys"]} id="keys" name="keys" value = {form.keys} onChange={handleOnChange} ></textarea>
        
           
        <button className={styles["save-btn"]} type="submit" >
            <img src = {save1} alt= "save1" className={styles.saveImg}/>
        </button>
        
        <Link to ="..">
        <button className={styles["cancel-btn"]} type="submit" >
            <img src = {cancel1} alt= "save" className={styles.cancelImg}/>
        </button>
        </Link>
       </form>
       {/* //<NotesStorage data={initialVal} />  */}
       </>
    )
}