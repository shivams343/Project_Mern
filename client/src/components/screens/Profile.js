import React,{useEffect} from 'react';

const Profile = ()=>{
    useEffect(()=>{
        fetch('/mypost',{
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
            }).then(res=>res.json())
            .then(result=>{
                console.log(result)
        })
    },[])
    return(
        <div>
            <div style={{
                        display:"flex",
                        justifyContent:"space-around",
                        margin:"18px 0px",
                        borderBottom:"1px solid  grey"
                    }}>
                <div>
                    <img style={{width:"160px",height:"160px",borderRadius:"80px"}}
                    src="https://images.unsplash.com/photo-1503248947681-3198a7abfcc9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80"/>
                </div>
                <div>
                    <h4>shivam</h4>
                </div>
            </div>
        </div>
    )
}

export default Profile