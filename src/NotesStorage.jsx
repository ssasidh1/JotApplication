import { useEffect, useState } from "react";
import styles from "./notesStorage.module.css"
import { EditNotes } from "./EditNotes";
import { useNavigate } from 'react-router-dom'
import { removeItem } from "./useLocalStorage";
import trash from "/trash-fill.svg";
import pencil from "/pencil-square.svg";
export function NotesStorage(props){
    // const notes = props.data;
    console.log("notes data ",props.data)
    const navigate = useNavigate();
    const [edit,setEdit] = useState([]);
    
    const [notes, setNotes] = useState(new Map())
    
    const handleClick = (id)=>{
      const updateEdit = [];
      updateEdit.push(id)
      updateEdit.push(notes.get(id))
      
        setEdit(updateEdit)
        
    }
    useEffect(()=>{
      setNotes(props.data)
    },[props.data])

    const handleDeleteClick = (id)=>{
      const newNote  =removeItem(id)
      setNotes(newNote)
    }
    useEffect(()=>{
      console.log("edit data ",edit)
      console.log("edit data 0 ",edit[0])
      if(edit.length!=0){
        navigate('/jot/edit', {state:{editData: edit}})
      }
    },[edit])
    
      
    if(notes.size == 0) return<><h1 style={{position:"absolute", top:"90%",}}>No notes yet</h1></>
    return(
    <div className={styles["container"]}>
  
        
        {
           Array.from(notes.entries()).map((note,index)=>(
          
             <div key = {note[0]} className={styles["flex-card"]}>
                <h2 className={styles["card-title"]}>{note[1].title}</h2>
                <p className={styles["card-body"]}>{note[1].body}</p>
                <button className={styles["view-btn"]} onClick={()=>handleClick(note[0])}>
                <img src={pencil} alt="edit-button" border="0" className={styles.edit} /></button>
                <button className={styles["delete-btn"]} onClick={()=>handleDeleteClick(note[0])}>
                <img src={trash} alt="edit-button" border="0" className={styles.trash} />
                </button>
             </div>
             
             
           ))
        }
   
      
    </div>
    
    )
    
}