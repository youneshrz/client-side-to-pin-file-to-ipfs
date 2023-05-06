import { useState } from "react"
import axios from "axios"
import { useWeb3Contract } from "react-moralis";
import contractAddresses from "./constants/contractAddresses.json";
import abi from "./constants/abi.json";
import { useMoralis } from "react-moralis";
import { useEffect } from "react";

const JWT = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJhNzdmYjNjOS01Y2QyLTRhZWYtYmE2Zi04MWMyMjNiNTZhNTYiLCJlbWFpbCI6Imdhc21pYS5pc2hhazgwMEBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJpZCI6IkZSQTEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX0seyJpZCI6Ik5ZQzEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiNzZhMzUwYzYzYmY1Y2MyNTcxZDMiLCJzY29wZWRLZXlTZWNyZXQiOiI0Y2UxNmNlZGYwZGY1NWRkNWE0MTBhMDc2OGY2ZmEzZDczMjRhNGFmMDIzY2I2ZjJjYWI0MDBhNWIxNDM4MjkyIiwiaWF0IjoxNjc5NDM1NTczfQ.ixIUkw3DynxjEfNRgvB8jKka5qO_QfRSdrvWeujSmn4`
const Home = () => {

const [selectedFile, setSelectedFile] = useState();
const [fileName, setFileName] = useState('');
const [hash, setHash] = useState();
useEffect(()=>{
  console.log(hash)
   uplodHash()
  },[hash])

const { chainId: chainIdHex, isWeb3Enabled } = useMoralis();
const chainId = parseInt(chainIdHex);
const addressOfContract =chainId in contractAddresses ? contractAddresses[chainId][0]: null

const { runContractFunction: Setfile,isLoading,isFetching, } = useWeb3Contract({
  abi: abi,
  contractAddress: addressOfContract,
  functionName: "Setfile",
  params: {_hash:hash,_name:fileName}
});

const changeHandler = (event) => {
  setSelectedFile(event.target.files[0]);
};
const changeName=(e)=>{
  setFileName(e.target.value)
}
const check_Name_Exist= async (names)=>{
  let test
  names.forEach(el => {
    if(el.metadata.name === fileName) {
       test=false;
    }else{
      test=true
    }   
  })
  return test
}

const handleSubmission = async() => {

  if (isWeb3Enabled) {
      
    const formData = new FormData();
    
    formData.append('file', selectedFile)

    const metadata = JSON.stringify({
      name: fileName,
    });
    formData.append('pinataMetadata', metadata);
    
    const options = JSON.stringify({
      cidVersion: 0,
    })
    formData.append('pinataOptions', options);

    try{
      const check_valid_Name = {'name':fileName};
      const res = await axios.post("http://localhost:4000/recharch", check_valid_Name, {
        maxBodyLength: "Infinity",
      });
      let check
      if((res.data).length > 0){
        check = await check_Name_Exist(res.data)
        {!check && alert('This name is declared, Plz provide other name')}
      }else if((res.data).length === 0){
         check=true
      }

      if(check){
      await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
        maxBodyLength: "Infinity",
        headers: {
          'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
          Authorization: JWT
        }
      }).then(async function (response) {
        
        setHash(prev =>response.data.IpfsHash);     
          
      });
      }
    } catch (error) {
      console.log(error);
    }
  
}else{
  alert('Plz connect to your wallet')
}
};
const uplodHash= async ()=>{
  
   Setfile(
    {
      onSuccess: async (tx) => {
        alert('Your hash succesfully add!')
        setFileName('')
        
      },
      onError: (error) => {
        console.log(" Sorry error accured" + error);
      },
    
  })
}

return (
    
    <>
    <label className="form-label">Choose File</label>
    <input type="text" value={fileName} onChange={changeName}/>

    <input type="file"   onChange={changeHandler}/>
    <button onClick={handleSubmission} disabled={isFetching}>Submit</button>    
    {isLoading && 'wait plz'}
    
    </>
  )
}

export default Home