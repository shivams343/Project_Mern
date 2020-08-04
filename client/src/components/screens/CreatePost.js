import React,{useState} from 'react'
import {Link,useHistory} from 'react-router-dom'
import M from 'materialize-css'


const CreatePost = ()=>{
    const history = useHistory()
    const [title,setTitle] = useState("")
    const [body,setBody] = useState("")
    const [contact,setContact] = useState("")
    const [location,setLocation] = useState("")    

    const postDetails = ()=>{
        const data = new FormData() 
            fetch("/createpost",{
            method:"post",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+ localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                title,
                body,
                contact,
                location
            })
        }).then(res=>res.json())
        .then(data=>{
             console.log(data)
            if(data.error){
                M.toast({html:data.error,classes:"#c62828 red darken-3"})
            }
            else{
                M.toast({html:"Post Created Successful",classes:"#00e676 green accent-3"})
                history.push('/')
            }
        }).catch(err=>{
            console.log(err)
        })
    }

    return(
        <div className="card input-filed"
             style={{
                 margin:"10px auto",
                 maxWidth:"500px",
                 padding:"20px",
                 textAlign:"center"
             }}
        >
             <input type="text" placeholder="Title"
             value={title}
             onChange={(e)=>setTitle(e.target.value)}
             />
             <input type="text" placeholder="Body"
             value={body}
             onChange={(e)=>setBody(e.target.value)}
             />
             <input type="number" placeholder="Contact"
             value={contact}
             onChange={(e)=>setContact(e.target.value)}
             />
             <input type="text" placeholder="Location"
             value={location}
             onChange={(e)=>setLocation(e.target.value)}
             />
             <button className="btn waves-effect waves-light"
             onClick={()=>postDetails()}>
                 Submit Post
                </button>
        </div>
    )
}

export default CreatePost