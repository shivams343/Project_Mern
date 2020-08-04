import React,{useState, useEffect } from 'react'

const Home = ()=>{
    const [data,setData] = useState([])
    console.log(data)
    useEffect(()=>{
        fetch('/allpost',{
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt")  
            }
        }).then(res=>res.json())
        .then(result=>{
            setData(result.posts)
        })
    },[])
    return(
        <div className="home">
            {
                data.map(item=>{
                    return(
                    <div className="card home-card" key={item._id}>
                        <h5>{item.postedBy.name}</h5>
                        <div className="card-content">
                            <ul>
                               <li>Title: {item.title} </li> 
                               <li>Body: {item.body} </li>
                               <li>Contact: {item.contact}</li>
                               <li>Location: {item.location}</li>
                            </ul>
                           
                        </div>
                    </div>
                 
                    )
                })
            }
           </div>
    )
}

export default Home