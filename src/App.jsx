import { Routes, Route, Navigate } from 'react-router-dom';
import {Home} from "./Home"
import {CreateNote} from "./CreateNote"
import { NotesStorage } from './NotesStorage';
import { EditNotes } from './EditNotes';


function App() {

  // function CreateNotes 
  return <Routes>
    <Route path="/jot/" element={<Home />}/>
    <Route path="/jot/create" element={<CreateNote  />}/>
    <Route path="*" element={<Navigate to ="/jot/" />}/>
    <Route path="/jot/edit" element={<EditNotes />}/>
    
  </Routes>
}

export default App;
