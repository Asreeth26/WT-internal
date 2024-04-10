import React, { useEffect, useState } from "react"
import axios from "axios"
import './Login.css'
import { useNavigate, Link } from "react-router-dom"


function adminLogin() {

    const history=useNavigate();

    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')

    async function submit(e){
        e.preventDefault();

        try{

            await axios.post("http://localhost:8000/admin",{
                email,password
            })
            .then(res=>{
                if(res.data=="exist"){
                    history("/home",{state:{id:email}})
                }
                else if(res.data=="notexist"){
                    alert("User have not sign up")
                }
            })
            .catch(e=>{
                alert("wrong details")
                console.log(e);
            })

        }
        catch(e){
            console.log(e);

        }

    }


    // return (
    //     <div className="login">
    //         <h1>Login</h1>
    //         <form action="POST">
    //             <input type="email" onChange={(e) => { setEmail(e.target.value) }} placeholder="Email"  />
    //             <input type="password" onChange={(e) => { setPassword(e.target.value) }} placeholder="Password"  />
    //             <input type="submit" onClick={submit} />

    //         </form>
    //     </div>
    // )
    return(
        <div className="main">
         <div class="background">
              <div class="shape"></div>
              <div class="shape"></div>
          </div>
          <form  className="form" onSubmit={submit}>
              <h3>Admin Login</h3>
      
              <label for="email">Email</label>
              <input type="email" onChange={(e) => { setEmail(e.target.value) }} placeholder="Email"  />
      
              <label for="password">Password</label>
              <input type="password" onChange={(e) => { setPassword(e.target.value) }} placeholder="Password"  />
              <button>Log In</button>
          </form>
        </div>
          )
}

export default adminLogin