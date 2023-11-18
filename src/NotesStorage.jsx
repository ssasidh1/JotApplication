import { useEffect, useState } from "react";
import styles from "./notesStorage.module.css"
import { EditNotes } from "./EditNotes";
import { useNavigate } from 'react-router-dom'
import { useUser } from './UserContext';
import trash from "/trash-fill.svg";
import pencil from "/pencil-square.svg";
import { setUserInfo,getUserInfo } from "./storeUser";
export function NotesStorage(props){
    // const notes = props.data;

  const { username, signIn, signOut } = useUser();
  const [userName, setUsername] = useState(username);
    const navigate = useNavigate();
    const [edit,setEdit] = useState([]);
    const [notes, setNotes] = useState(new Map())
    const handleClick = (title)=>{
      // const updateEdit = [];
      // updateEdit.push(id)
      // updateEdit.push(notes.get(id))
        const item = notes.filter((items)=>{
          return items.title==title
        })
        
        setEdit(item)
        
    }
    useEffect(()=>{
      console.log("Im reloaded too")
      if(userName === null){
          const u = getUserInfo().username;
          signIn(u); 
          setUsername(u)
      }
  },[userName])
    useEffect(()=>{
      setNotes(props.data)
    },[props.data])

    const handleDeleteClick = async(note)=>{
   
      const formValue = { 
        username:username,
        noteValues:[{
        title:note[1].title,
        body:note[1].body,
        keys:note[1].keys,
        tags:note[1].tags}]
        };      

      try
      {
          console.log("delete username",userName);
          const res = await fetch(
              `https://fz7be10kxd.execute-api.us-east-1.amazonaws.com/notes/${userName}`,
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
            const data = await res.json()
            console.log("delete remains",data)
            setNotes(data)
           
          }
          else{
              console.error("failed to create");
          }
      } catch (error){
          console.error("error to create");
      }
      
      
    }
    useEffect(()=>{
      
      if(edit.length!=0){
        navigate('/jot/edit', {state:{editData: edit,username:username}})
      }
    },[edit])
      
    if(notes.length === 0) return<><h1 style={{position:"absolute", top:"90%",}}>No notes yet</h1></>
    return(
    <div className={styles["container"]}>
        {
           Array.from(notes.entries()).map((note,index)=>(
          
             <div key = {note[1].title} className={styles["flex-card"]}>
                <h2 className={styles["card-title"]}>{note[1].title}</h2>
                <p className={styles["card-body"]}>{note[1].body}</p>
                <button className={styles["view-btn"]} onClick={()=>handleClick(note[1].title)}>
                <img src={pencil} alt="edit-button" border="0" className={styles.edit} /></button>
                <button className={styles["delete-btn"]} onClick={()=>handleDeleteClick(note)}>
                <img src={trash} alt="edit-button" border="0" className={styles.trash} />
                </button>
             </div>
             
             
           ))
        }
   
      
    </div>
    
    )
    
}