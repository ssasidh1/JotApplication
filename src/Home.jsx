import styles from "./Home.module.css"
import { useEffect, useState } from 'react';
import { useNavigate,useLocation } from 'react-router-dom'
import { NotesStorage } from "./NotesStorage";
import { useRef } from "react";
import downarrow from "/down-arrow.png";
import plus from "/plus.png";
import { useUser } from './UserContext';
import { setUserInfo,getUserInfo } from "./storeUser";
import CreatableSelect from "react-select/creatable"
export function Home() {
    const [activeButton, setActiveButton] = useState({ downArrowBtn: false,titleSearch:false });
    const [search, setSearch] = useState('')
    const [data, setData] = useState(new Map())
    const [filter, setFilter] = useState(new Map())
    const [value,setValue] = useState([]);
    const [options,setOptions] = useState([])
    const [notes, setNotes] = useState(new Map())
    const [notedata,setNoteData] = useState();
    const { username, signIn, signOut } = useUser();
    const [userName, setUsername] = useState(username);
    console.log("home",username);
    
    useEffect(()=>{
        console.log("Im reloaded too")
        if(userName === null){
            const u = getUserInfo().username;
            signIn(u); 
            setUsername(u)
        }
    },[userName])

      const dropdown1Ref = useRef(null);
      const dropdown2Ref = useRef(null);
      const drop = useRef(null);
    const navigate = useNavigate();
    const loc = useLocation();
    // const username = loc.state && loc.state.username;
    
    useEffect(()=>{

        const getdata = async()=>{
        try
        {
            
            console.log("username from home",userName)
            if(userName !== null){
            const res = await fetch(
                `https://fz7be10kxd.execute-api.us-east-1.amazonaws.com/notes/${userName}`,
                {
                    method:"GET",
                    mode:"cors",
                    headers:{
                        "Content-Type":"application/json"
                    }
                }
            );

            if(res.ok){
                const data = await res.json()
                setNoteData(data.noteValues ||[])
                setNotes(data.noteValues || [])
                console.log("noteeee",data.noteValues)
                if(data.noteValues)
                {const updatedData = data.noteValues.reduce((acc,item )=> {
                    return acc.concat(item.tags);
                  },[]);
                console.log("tags",updatedData);
                setOptions(updatedData);
                }
                
                
            }
        }
           
        } catch (error){
            console.error("error to create",error);
        }
    }
    getdata();
    },[username]);
    useEffect(()=>{
        console.log("value, note btn")
        if(value.length != 0)
        {
            let dTag = [];
            for(const v of value){
                // const dataTag = getDataForTag(v.value);
                 dTag = notedata.reduce((acc,item)=>{
                 
                    return acc.concat( item.tags.map((e)=>{
                        if(e.value === v.value){
                            return item
                        }
                    }).filter(Boolean) // Filter out undefined values
                    )
                },dTag)

            }
                                  
            
            setNotes(dTag)
        }
        else{
            setNotes(notedata || [])
        }
        
    },[value,notedata])
    // const toggleCollapse = (buttonName) => {
    //     console.log("dropDown",activeButton)
    //     setActiveButton(
    //         (prevState) => ({
                
    //             ...prevState,
    //             [buttonName]: !prevState[buttonName],
                
    //         })
    //     );
        
    // };

    const navigateToCreatePage = () => {

        navigate('/jot/create', {state:{notes: notes}})

    }
    useEffect(() => {
        console.log("empty btn")
        const storeData = new Map(JSON.parse(localStorage.getItem('data'))) || new Map();
        setData(storeData)
    }, [])

  

    useEffect(() => {
        console.log("search btn")
        if (search !== "") {
            // const searchedData = data.filter(item =>
            //     (item.title).toLowerCase().includes(search.toLowerCase())

            // )
            let foundKey = null;
            const searchedData=new Map();
          
            notes.forEach((value, key)=>{
                
                
                if(value.title.includes(search)){
                    foundKey = key;
                    searchedData.set(key,value);
                    
                }
                
                
            })
            
            setFilter(searchedData);
            
            
        }
        else {
            setFilter(new Map());
        }



    }, [search])
    const searchChange = (e) => {
        setSearch(e.target.value)
    }
   

    const handlebtnClick = (data) => {
       
        navigate('/jot/edit', { state: { editData: [data],username:username } })

    }

    const handleTagChange = (e)=>{
        setValue(e)
    }
    const style = {
        control: base => ({
          ...base,
          // This line disable the blue border
          boxShadow: "none",
          "&:focus": {
            /* Your focus styles here */
            borderColor: "#ff5733", // Change border color on focus
            outline: "none",       // Remove the default outline on focus
          },
        })
      };
   useEffect(() => {
        const handleClickOutside = (event) => {
            console.log("inside handlelick1",drop.current )
            
          if (dropdown1Ref.current && drop.current && (!dropdown1Ref.current.contains(event.target) && !drop.current.contains(event.target))) {
            setSearch('')
            setActiveButton((prevStatus) => ({
                titleSearch: false,
                downArrowBtn: false,
              }));
          }
          if (dropdown2Ref.current && !dropdown2Ref.current.contains(event.target)) {
            setActiveButton((prevStatus) => ({
                titleSearch: false,
                downArrowBtn: false,
              }));
          }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
      }, [activeButton]);

      const handleDropDowns= (btn)=>{
        console.log("btn",btn)
        setActiveButton((prevStatus) => ({
            titleSearch: btn === 'downArrowBtn' ? false : !prevStatus.titleSearch,
            downArrowBtn: btn === 'titleSearch' ? false : !prevStatus.downArrowBtn,
          }));
       
        console.log("activebtn",activeButton);
      }

 
    return (
       
        <div className={styles["div-main"]} >
         <input type="search" className={styles.Search} placeholder="Search..." 
            onChange={searchChange}  value={search}  ref={dropdown1Ref} onClick={()=>handleDropDowns('titleSearch')} />
            {   
                filter.size > 0 && (
                    <div className={styles["list"]}>
                        {
                            Array.from(filter.entries()).map((data, k) => (
                            <button className={styles["btn_list"]}
                                key={data[1].title} onClick=
                                {() => {handlebtnClick(data[1])}}>{data[1].title}
                            </button>))
                        } 
                    </div>)
            }
        <CreatableSelect isMulti styles = {style}options={options} value = {value} className={styles['tag-search']} onChange = {handleTagChange} />
        <button onClick={() => navigateToCreatePage()} className={styles.plusbutton}> 
        <img src={plus} alt="plus-button" border="0" className={styles.plusbtn}  />
        </button>  
        <div className={styles.container} ref={dropdown2Ref}>
            <button  className={styles.userbutton} >
            <img src={downarrow} alt="profile-button" border="0" className={styles.downarrow} onClick={()=>handleDropDowns('downArrowBtn')} />
            </button>
            {activeButton.downArrowBtn && ( 
                <div className={`${styles['userdetails']} ${styles['hidden']}`}>
                                <a href="#" className={styles.logout} ref={drop} onClick={() => { event.stopPropagation();navigate('/jot/signin')}}>Logout</a>
                            </div>
            )} 
        </div> 
            <hr className={styles.hrline} />
            <NotesStorage data={notes} username={username} /> 
        </div>
    );
}