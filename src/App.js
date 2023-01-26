import { useState,useEffect } from 'react';
import './App.css';
import MemberComponent from './components/MemberComponent';
import Memberdata from './data/Memberdata';

function App() {

  const [memberData,setMemberData] = useState(Memberdata)
  const [dataInpage,setDataInpage] = useState([])
  const [page, setPage] = useState(0)


  const pagination=()=>{
    const memberPerpage = 4

    const pages = Math.ceil(Memberdata.length / memberPerpage )
    console.log(pages)
    
    const newMember=Array.from({length:pages},(data,index)=>{
      const start = index*memberPerpage
     return  Memberdata.slice(start,start+memberPerpage)
    })
      return newMember
  }

  useEffect(() => {
    const paginate = pagination()
    setDataInpage(paginate)
    setMemberData(paginate[page])
  }, [page])
  
  const handlePage=(index)=>{
    setPage(index)
  }
  return (
    <div className="App">
      <h1>Pagination</h1>
      <div className='container'>
      {memberData.map((data,index)=>{
          return <MemberComponent key={index} {...data}/>
        })}
      </div>     
      <div className='pagination-container'>
        {dataInpage.map((data,index)=>{
          return(
            <button className={`page-btn ${index === page? 'active-btn' : null}`} 
            key={index} 
            onClick={()=>handlePage(index)}>{index+1}</button>
          )
        })}
      </div>
    </div>
  );
}

export default App;
