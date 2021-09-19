import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./QHeader.css";
import db from "../firebase";
import Channel from "./chat/Channel";
import Modal from "react-modal";
import QHeader from "./QHeader";
Modal.setAppElement("#root");
function Profile() {
  let { id } = useParams();
  console.log("this is id" + id);
  const [user, setuser] = useState({});
  const [IsmodalOpen, setIsModalOpen] = useState(false);

  const email1 = user.email;
  useEffect(() => {
    db.collection("faculty")
      .where("email", "==", id)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((element) => {
          var data = element.data();
          console.log(data);
          setuser(data);
        });
      });
  }, []);

  return (
    <div>
      <QHeader />
      <div style={{ display: "flex", paddingLeft: "18%", paddingTop: "5%" }}>
        <img
          style={{
            border: "solid 2px #018e95",
            borderRadius: "50%",
            background: "white",
          }}
          src="https://dp-client.com/CMS-NEW/assets/images/user/user11605616227.png"
        />
 <Modal
          isOpen={IsmodalOpen}
          onRequestClose={() => setIsModalOpen(false)}
          shouldCloseOnOverlayClick={false}
          style={{
            overlay: {
              width: 700,
              height: 600,
              boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
              zIndex: "1000",
              top: "50%",
              left: "50%",
              marginTop: "-300px",
              marginLeft: "-350px",
            },
          }}
        >
            <div className="modal__title">
                <h5>Disscusly chat</h5>
                  </div>
                  <div
        style={{ display: "block"}}
      >
        <Channel email1={id} />
      </div>
            <div className="modal__buttons">
                <button className="cancle" onClick={() => setIsModalOpen(false)}>
                Cancel
                </button>
            </div>
        </Modal>
        <div style={{paddingLeft:"5%", display:"flex", flexDirection: "column", justifyContent:"space-evenly"}}>
          <h1
            className="App"
            style={{ alignSelf: "center", paddingLeft: "5%" }}
          >
            {id}
          </h1>
        <div style={{display:"flex", justifyContent: "space-around"}}>
    
          <button
            style={{
              height: "100%",
              width: "25%",
              fontSize: "larger",
              background: "#189AB4",
              border: "none",
              borderRadius: "13%",
              color: "black",
              fontWeight: "bold",
            }}
          >
            Faculty
          </button>
                      <button
                          class="cleardoubt"
            style={{
              height: "100%",
              width: "25%",
              fontSize: "larger",
              background: "#189AB4",
              border: "none",
              borderRadius: "13%",
              color: "black",
              fontWeight: "bold",
                          }}
                          
                          onClick={() => {
                              setIsModalOpen(true
                              )
                          }}
          >
            Clear Doubts
                      </button>
                      
        </div>
      </div>
     
    </div>
    </div>
  );
}
export default Profile;
