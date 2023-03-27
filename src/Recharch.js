import { useState } from "react"
import axios from "axios"


const Recharch=()=>{

  const [fileName, setFileName] = useState('');
    const [data,setData]=useState('')

    const changeName=(e)=>{
        setFileName(e.target.value)
    }
      const handleSubmission = async() => {
    try{
       
        const formData = {'name':fileName};
        const res = await axios.post("http://localhost:4000/recharch", formData, {
          maxBodyLength: "Infinity",
        
        });
        
        setData(res.data)

      } catch (error) {
        console.log(error);
      }
    }
    return(
        <>
        <label className="form-label">Choose name</label>
        <input type="text"  onChange={changeName}/>
        <button onClick={handleSubmission}>Submit</button>
        
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

       
    
      
        </>
    )
}
export default Recharch