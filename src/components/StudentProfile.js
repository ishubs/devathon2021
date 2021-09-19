import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom"
import db from "../firebase";
import QHeader from "./QHeader";
import Channel from "./chat/Channel";
import Post from "./Post";
import Modal from "react-modal";
function Profile() {
    let { id } = useParams()
    const [user, setuser] = useState({})
    const [posts, setPosts] = useState([])
    const [IsmodalOpen, setIsModalOpen] = useState(false);
    useEffect(() => {
       
        db.collection("student").where('email', '==', id).get()
            .then((querySnapshot) => {
                     
                querySnapshot.forEach(element => {
                    var data = element.data();
                    console.log(data)
                    setuser(data)
                    
                });
            })
        db.collection("questions").where('email', "==", id).onSnapshot((snapshot) =>
        setPosts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            questions: doc.data(),
          }))
        )
      );

            console.log(posts)
          
        }, [])
    
        console.log(posts)
    
    return (
        <div>
            <QHeader />
            
            <div style={{ display: "flex", paddingLeft:"18%", paddingTop:"5%" }}>
                <img
                    style={{ border: "solid 2px aqua", borderRadius: "50%", background:"white"}}
                    src="https://dp-client.com/CMS-NEW/assets/images/user/user11605616227.png" />
                <div style={{ display: "flex", flexDirection: "column", paddingLeft:"5%", justifyContent:"space-around" }}>
                    <h1 className="App" style={{ alignSelf: "center", paddingLeft: "5%" }}>{id}</h1>
                    <button style={{height: "25%", width: "50%", fontSize: "larger", backgroundColor: "#189AB4", border: "none",borderRadius: "13%",color: "black",fontWeight: "bold"}}>Student</button>
                </div>
                
               
            </div >
        <div style={{marginLeft:"20%", marginRight:"20%"}}>
            {posts.map(({ id, questions}) => (
        <Post
          key={id}
          Id={id}
          question={questions.question}
          imageUrl={questions.imageUrl}
          timestamp={questions.timestamp}
          users={questions.user}
          file={questions.file == undefined ? "" : questions.file}
          upvote={questions.upvote}
          field={"questions"}
        />
            ))}
        </div>
        <div style={{display:"flex", position:"fixed", right: "5%", bottom: 0}}><Channel email1={ id}/></div>
            
        </div>
    );
    
}
export default Profile
