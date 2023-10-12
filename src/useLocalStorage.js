
import { NotesStorage } from "./NotesStorage";

export function useLocalStorage(key,initialValue){
//    console.log("inside uselocal",initialValue)
    let notes,ind;
    try
    {
        const data= localStorage.getItem(key);
        notes = data ? new Map(JSON.parse(data)):new Map();
        const removedInd = localStorage.getItem('removeInd')
        ind = removedInd ? new Set(JSON.parse(removedInd)): new Set();
        
    }
    catch(err){
        console.log(" err type ",typeof(notes))
        console.log(err);

    }
    
        if(notes.size == 0){
           
           notes.set(0, initialValue);
        }
        else{
            if(ind.size != 0 ){
                for(const key of ind){
                    notes.set(key, initialValue);  
                    console.log("local ", key, initialValue, ind)
                    ind.delete(key);
                    localStorage.setItem('removeInd',JSON.stringify(Array.from(ind)))
                    break;
                }
            }
            else{
                notes.set(notes.size, initialValue);  
            }
            
        }
        // const check = JSON.stringify(Array.from(notes))
        // console.log(new Map(JSON.parse(check)));
        // //console.log(check);

    localStorage.setItem(key,JSON.stringify(Array.from(notes)))

    
}

export function updateStorage(key,initialValue,id){
    //    console.log("inside uselocal",initialValue)
        let notes;
        try
        {
            const data= localStorage.getItem(key);
            notes = data ? new Map(JSON.parse(data)):new Map();
            
        }
        catch(err){
            console.log(err);
    
        }
        
             notes.set(id,initialValue);
            // if(updateItem){
            //     updateItem.title = initialValue.title;
            //     updateItem.body = initialValue.body;
            //     updateItem.tags = initialValue.tags;
            //     updateItem.keys = initialValue.keys;
            // }

            // console.log(notes);
        
    
            localStorage.setItem(key,JSON.stringify(Array.from(notes)))
    
        
}

export function getStorage(key,id){
    //    console.log("inside uselocal",initialValue)
        let notes;
        try
        {
            const data= localStorage.getItem(key);
            notes = data ? new Map(JSON.parse(data)):new Map();
            
        }
        catch(err){
            console.log(err);
    
        }
        let findItem =  notes.get(id)
        if(findItem){
            return findItem;
        }
          
        else return null;
    
        
    }

    export function getTags(){
        let notes;
        try
        {
            const data= localStorage.getItem('data');
            notes = data ? new Map(JSON.parse(data)):new Map();
            
        }
        catch(err){
            console.log(err);
    
        }
        if(notes.size != 0){
            // const tags = notes.map((item)=>
            //      item.tags
            // )
            // const filteredTags = tags.filter((item)=> item.length>0)
            // const final = [];
            const seenValues = new Set();

            // filteredTags.forEach((inner)=>{
            //     inner.forEach((obj)=>{
            //         if(!seenValues.has(obj.value)){
            //             final.push(obj);
            //             seenValues.add(obj.value);
            //         }
            //     })
            // })
            const tagAr = []
            notes.forEach((value)=>{
                if(value.tags.length != 0){
                    
                    value.tags.map((t)=> {
                        if(!seenValues.has(t)){
                            tagAr.push(t);
                            seenValues.add(t);
                    }})
                }
            }
            )
            
            return tagAr;
        }
        return [];
        
    }


    export function getDataForTag(tag){
        let notes;
        try
        {
            const data= localStorage.getItem('data');
            notes = data ? new Map(JSON.parse(data)):new Map();
            
        }
        catch(err){
            console.log(err);
    
        }
        const dataTag = new Map();
        if(notes.size != 0){
            notes.forEach((val,key)=>{
                
                if(val.tags.length !=0){
                    for(const t of val.tags){
                        if(t.value == tag){
                            dataTag.set(key,val);
                            break;
                        }
                    }
                }
            })
            
        }
        //console.log("dt in fn ", dataTag)
        if(dataTag.size != 0) return dataTag;
        return new Map();
        
    }


    export function removeItem(id){
        let notes , ind;
        console.log("removeitem",id)
        try
        {
            const data= localStorage.getItem('data');
            notes = data ? new Map(JSON.parse(data)):new Map();
            const removedInd = localStorage.getItem('removeInd');
            ind = removedInd ? new Set(JSON.parse(removedInd)):new Set();
            
        }
        catch(err){
            console.log(err);
    
        }
        if(notes.has(id)){
                console.log("id",id)
                ind.add(id);
                console.log("ind",ind);
                console.log("id")

            notes.delete(id);
            // const postRemove  = notes.filter((item)=>{
            //     return item.id !=id
            //     //console.log("id", id, item.id)
            // })
            localStorage.setItem('removeInd',JSON.stringify(Array.from(ind)))
            localStorage.setItem('data',JSON.stringify(Array.from(notes)))
        }
        const data= localStorage.getItem('data');
        const notesP = data ? new Map(JSON.parse(data)):new Map();
        console.log(notesP)
        return notesP;
    }


    export function notesFetchForHome(){

        const data= localStorage.getItem('data');
        const notes = data ? new Map(JSON.parse(data)):new Map();
        if(notes.size == 0) return new Map();
        const last10 = Array.from(notes.entries()).slice(-10).reverse();
        console.log("last10",last10)
        const fetchMap = new Map();
        for(const [key,value] of last10){
            fetchMap.set(key,value);
        }
        return fetchMap;
        
    }





