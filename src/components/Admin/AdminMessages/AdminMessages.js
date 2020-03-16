import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWindowClose } from "@fortawesome/free-solid-svg-icons";
import Axios from "axios";
import NavBarAdmin from "../NavBarAdmin/NavBarAdmin";
import './AdminMessages.css';

const AdminMessages = () => {
  const [messages, setMessages] = useState(null);

  useEffect(() => {
    getMessages();
  }, []);

  const getMessages = () => {
    Axios.get("http://localhost:8000/api/messages")
      .then(result => result.data)
      .then(data => {
        let stockMessages = data;
        setMessages(stockMessages);
      });
  };

  const deleteMessage = messageId => {
    if (window.confirm("Do you really wanna delete this message ?")) {
      Axios.delete(`http://localhost:8000/api/messages/:${messageId}`)
        .then(res => {
          if (res.status === 200) {
            alert(
              "Message has been deleted, please refresh the page to see the changes"
            );
          } else {
            alert("Error");
          }
          console.log(res);
        })
        .then(response => {
          console.log(response);
        });
      document.location.reload();
    }
  };

  return (
    <div className="messagesMainContainerAdmin">
      <NavBarAdmin />
      <div className="adminMessagesContainer">
        <h1 className="manageAdminMessages">New messages</h1>
        <div className="messagesContainerAdmin">
          { messages ?
            messages.map(message => {
              return (
                <div className="messageCardAdmin">
                  <div
                    onClick={() => deleteMessage(message.id)}
                    className="deleteMessageAdmin"
                  >
                    <FontAwesomeIcon
                      icon={faWindowClose}
                      className="closeIconAdmin fa-2x"
                    />
                    <p>Delete this message</p>
                  </div>
                  <h2>
                    Title:{" "}
                    <span className="contentMessageAdmin">{message.title}</span>
                  </h2>
                  <p className="itemMessageCardAdmin">
                    Mail:{" "}
                    <span className="contentMessageAdmin">{message.mail}</span>
                  </p>
                  <p className="itemMessageCardAdmin">
                    Name:{" "}
                    <span className="contentMessageAdmin">{message.name}</span>
                  </p>
                  <p className="itemMessageCardAdmin">
                    Firstname :{" "}
                    <span className="contentMessageAdmin">{message.firstname}</span>
                  </p>
                  <p className="itemMessageCardAdmin">Message :</p>
                  <p className="contentMessageAdmin">{message.body}</p>
                </div>
              );
            })
            : <h1>Coucou</h1>
          }
        </div>
      </div>
    </div>
  );
};

export default AdminMessages;
