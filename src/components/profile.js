import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom"
import db from "../firebase";
function Profile() {
    let { id } = useParams()
    const [user, setuser] = useState({})
    useEffect(() => {
       
            db.collection("faculty").where('email', '==', id).get()
              .then((querySnapshot) => {
                     
              querySnapshot.forEach(element => {
                  var data = element.data();
                  console.log(data)
                  setuser(data)
                    
              });
          })
          
    },[])

    
        return (<h1 className="App">{id}</h1>);
    
}
export default Profile
