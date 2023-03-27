import { useState, useEffect } from "react"
import axios from "axios"

const Getall = () => {
    
    const [data, setdata] = useState();
  
    useEffect(()=>{
        const getall = async() =>{
            
            try{
                const res =await axios.get("http://localhost:4000/getall", {
                  maxBodyLength: "Infinity",               
                });
               
               await setdata(res.data.rows) 
                      
              } catch (error) {
                console.log(error);
              }
        }
        getall()
       
    },[])

    
  return(
    <>
    <label className="form-label">Get all</label>
     <h1>

    { data &&
        data.map(el=>{
       return (
           <div key={el.id} style={{display:'flex',justifyContent:'space-between'}}>
                <p>{el.metadata.name}</p>
                <a  href={`https://gateway.pinata.cloud/ipfs/${el.ipfs_pin_hash}`}>{`${el.ipfs_pin_hash}`}</a>
             </div>
    )
    }
    
    )} 
    </h1>
    </>
  )

}
  export default Getall