import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom"
import db from "../firebase";
import Channel from "./Channel";
function Profile() {
    let { id } = useParams()
    const [user, setuser] = useState({})
    useEffect(() => {
       
            db.collection("student").where('email', '==', id).get()
              .then((querySnapshot) => {
                     
              querySnapshot.forEach(element => {
                  var data = element.data();
                  console.log(data)
                  setuser(data)
                    
              });
          })
          
    },[])

    
    return (
        <div><h1 className="App">{id}</h1>
            <Channel email1={ id}/>
        </div>
    );
    
}
export default Profile
