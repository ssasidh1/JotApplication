import styles from "./Home.module.css"
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { NotesStorage } from "./NotesStorage";
import { getDataForTag, getStorage } from "./useLocalStorage";
import { notesFetchForHome } from "./useLocalStorage";
import { getTags } from "./useLocalStorage";
import { useRef } from "react";
import downarrow from "/down-arrow.png";
import plus from "/plus.png";


import CreatableSelect from "react-select/creatable"
export function Home() {
    const [activeButton, setActiveButton] = useState({ downArrowBtn: false });
    const [search, setSearch] = useState('')
    const [data, setData] = useState(new Map())
    const [filter, setFilter] = useState(new Map())
    const [value,setValue] = useState([]);
    const [options,setOptions] = useState([])
    const [notes, setNotes] = useState(new Map())
    const [notedata,setNoteData] = useState();
    const [dropdownStatus, setDropdownStatus] = useState({
        isOpen1: false,
        isOpen2: false,
      });
      const dropdown1Ref = useRef(null);
      const dropdown2Ref = useRef(null);
    const navigate = useNavigate();
    useEffect(()=>{
        const username =  's'
        const getdata = async()=>{
        try
        {
            const res = await fetch(
                `https://fz7be10kxd.execute-api.us-east-1.amazonaws.com/notes/${username}`,
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
                setNoteData(data.noteValues)
                setNotes(data.noteValues)
                
                const updatedData = data.noteValues.reduce((acc,item )=> {
                    return acc.concat(item.tags);
                  },[]);
                console.log("notevals",updatedData)
                setOptions(updatedData);
                
                
            }
            else{
                console.error("failed to create");
            }
        } catch (error){
            console.error("error to create");
        }
    }
    getdata();
    },[]);
    useEffect(()=>{
        if(value.length != 0)
        {
            let dTag = [];
            for(const v of value){
                // const dataTag = getDataForTag(v.value);
                 dTag = notedata.reduce((acc,item)=>{
                    console.log("acc",acc)
                    return acc.concat( item.tags.map((e)=>{
                        if(e.value === v.value){
                            return item
                        }
                    }).filter(Boolean) // Filter out undefined values
                    )
                },dTag)

            }
                                  
            console.log("tag data",dTag)
            setNotes(dTag)
        }
        else{
            setNotes(notedata || [])
        }
        
    },[value,notedata])
    const toggleCollapse = (buttonName) => {
        setActiveButton(
            (prevState) => ({
                ...prevState,
                [buttonName]: !prevState[buttonName],
            })
        );
        
    };

    const navigateToCreatePage = () => {

        navigate('/jot/create', {state:{notes: notes}})

    }
    useEffect(() => {
        const storeData = new Map(JSON.parse(localStorage.getItem('data'))) || new Map();
        setData(storeData)
    }, [])

    useEffect(()=>{
        console.log("useEffect",filter)
    },[filter])

    useEffect(() => {
        console.log("####se",search)
        if (search != "") {
            // const searchedData = data.filter(item =>
            //     (item.title).toLowerCase().includes(search.toLowerCase())

            // )
            let foundKey = null;
            const searchedData=new Map();
            data.forEach((value, key)=>{
                console.log("####",value.title, search)
                
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



    }, [search, data])
    const searchChange = (e) => {
        setSearch(e.target.value)
    }
   

    const handlebtnClick = (data) => {
        console.log("edit handle",data)
        navigate('/jot/edit', { state: { editData: data } })

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
      const toggleDropdown = (dropdownName) => {
        console.log(dropdownName)
        
        setDropdownStatus({
          ...dropdownStatus,
          [dropdownName]: !dropdownStatus[dropdownName],
        });
      };
      useEffect(() => {
        const handleClickOutside = (event) => {
          if (dropdown1Ref.current && !dropdown1Ref.current.contains(event.target)) {
            setSearch('')
            setDropdownStatus((prevStatus) => ({
                isOpen2: false,
                isOpen1: false,
              }));
          }
          if (dropdown2Ref.current && !dropdown2Ref.current.contains(event.target)) {
            setDropdownStatus((prevStatus) => ({
                isOpen1: false,
                isOpen2: false,
              }));
          }
        };
    
        document.addEventListener('mousedown', handleClickOutside);
    
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
      }, [dropdownStatus]);
    return (
       
        <div className={styles["div-main"]}>
         <input type="search" className={styles.Search} placeholder="Search..." 
            onChange={searchChange} onClick = {()=>toggleDropdown('isOpen1')} value={search}  ref={dropdown1Ref} />
            {
                 dropdownStatus.isOpen1 &&  filter.size > 0 && (
                    <div className={styles["list"]}>
                        {Array.from(filter.entries()).map((data, k) => (
                            <button className={styles["btn_list"]}
                                key={data[0]} onClick=
                                {() => handlebtnClick(data)}>{data[1].title}</button>))
                        } 
                      </div>)
            }
        
        <CreatableSelect isMulti styles = {style}options={options} value = {value} className={styles['tag-search']} onChange = {handleTagChange} /> 
       
        <button onClick={() => navigateToCreatePage()} className={styles.plusbutton}> 
        <img src={plus} alt="plus-button" border="0" className={styles.plusbtn} />
        </button>
            
        <div className={styles.container} ref={dropdown2Ref}>
            <button onClick={() => {toggleCollapse('downArrowBtn'),toggleDropdown('isOpen2')}} className={styles.userbutton}>
            <img src={downarrow} alt="profile-button" border="0" className={styles.downarrow} />
            </button>
            {dropdownStatus.isOpen2 &&activeButton.downArrowBtn && ( 
                <div className={`${styles['userdetails']} ${styles['hidden']}`}>
                                <a href="#">hello</a>
                            </div>

            )} 
        </div> 
            <hr className={styles.hrline} />
            <NotesStorage data={notes} /> 
            
        </div>
    );
}