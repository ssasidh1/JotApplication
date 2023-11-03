import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import {Home} from "./Home"
import {CreateNote} from "./CreateNote"
import { EditNotes } from './EditNotes';
import { useState,useEffect } from "react"
import { SignUp } from './SignUp';
import { Signin } from './signin';

function App() {
 const location = useLocation();
 const [bgColor, setBgColor] = useState("linear-gradient( #a2c7dd 15%, #f1f1e6 90%)")
  // function CreateNotes 
  useEffect(() => {
    // Update background color based on the current route
    const { pathname } = location;
    if (pathname === '/jot/') {
      setBgColor("linear-gradient( #a2c7dd 15%, #f1f1e6 90%)");
    } else if (pathname === '/jot/create') {
      setBgColor("linear-gradient( #daecf7 15%, #f1f1e6 90%)");
    } else if (pathname === '/jot/edit') {
      setBgColor("linear-gradient(175deg, #e6e3e3 60%, #f5f5de 90%)");
    } else {
      // For any other routes, set a default color
      setBgColor("linear-gradient( #a2c7dd 15%, #f1f1e6 90%)");
    }
  }, [location]);
  return( 
  <div style={{ backgroundImage: bgColor, minHeight: '100vh' }}>
  <Routes>
    <Route path="/jot/" element={<Home />}/>
    <Route path="/jot/create" element={<CreateNote  />}/>
    <Route path="*" element={<Navigate to ="/jot/" />}/>
    <Route path="/jot/edit" element={<EditNotes />}/>
    <Route path="/jot/signup" element={<SignUp />}/>
    <Route path="/jot/signin" element={<Signin />}/>
  </Routes>
  </div>
  )
}

export default App;
