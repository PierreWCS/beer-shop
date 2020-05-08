import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faWindowClose } from "@fortawesome/free-solid-svg-icons";
import Axios from "axios";
import NavBarAdmin from "../NavBarAdmin/NavBarAdmin";
import "./AdminMessages.css";

const AdminMessages = () => {
  const [messages, setMessages] = useState(null);
  const [displayFullMessage, setDisplayFullMessage] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(false);

  useEffect(() => {
    getMessages();
  }, []);

  const getMessages = () => {
    Axios.get("http://localhost:8000/api/messages")
      .then(result => result.data)
      .then(data => {
        setMessages(data);
      });
  };

  const deleteMessage = messageId => {
    if (window.confirm("Do you really wanna delete this message ?")) {
      Axios.delete(`http://localhost:8000/api/messages/:${messageId.id}`).then(
        res => {
          if (res.status === 200) {
            let indexDelete = messages.filter(
              message => message.id === messageId.id
            );
            let stockMessages = messages.splice(indexDelete, 1);
            setMessages([...stockMessages]);
            setDisplayFullMessage(false);
            alert("The message has been deleted");
          } else {
            alert("Error");
          }
        }
      );
    }
  };

  return (
    <div className="productsAdmin messagesMainContainerAdmin">
      <NavBarAdmin />
      <div className="adminMessagesContainer">
        <h1 className="manageAdminMessages">New messages</h1>
        <div className="messagesContainerAdmin">
          <div className="messagesAdminHeadContainer">
            <p className="messagesAdminHeadCell">TITLE</p>
            <p className="messagesAdminHeadCell">E-MAIL</p>
            <p className="messagesAdminHeadCell">DATE</p>
          </div>

          {/*     Display the messages from the contact form      */}

          <div>
            {messages ? (
              messages.map((message, key) => {
                return (
                  <div
                    key={key}
                    className="messagesAdminContentContainer"
                    onClick={() => {
                      setDisplayFullMessage(true);
                      setSelectedMessage(messages[key]);
                    }}
                  >
                    <p className="messagesAdminContentCell">{message.title}</p>
                    <p className="messagesAdminContentCell">{message.mail}</p>
                    <div className="messagesAdminContentCell dateAdminMessageHead">
                      <div className="dateAdminMessageCell">
                        <p>{message.date}</p>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <p>No messages</p>
            )}
          </div>
        </div>
      </div>

      {/*     Display message details     */}

      {displayFullMessage ? (
        <div className="selectedMessageContainer">
          <div
            className="closeMessageButton"
            onClick={() => setDisplayFullMessage(false)}
          >
            <FontAwesomeIcon className="fa-2x closeMessageIcon" icon={faWindowClose} />
            <p>Close</p>
          </div>
          <div className="messageBodyContainer">
            <div className="nameAndFirstNameAdminMessages">
              <p className="fromAdminMessageDetails">From: </p>
              <p>
                {selectedMessage.name} {selectedMessage.firstname}
              </p>
            </div>
            <div className="dateAdminMessagesContainer">
              <p className="dateAdminMessage">The:</p>
              <p>{selectedMessage.date}</p>
            </div>
            <div className="emailContainerAdminMessages">
              <p className="emailAdminMessages">Email:</p>
              <p id="#mail">{selectedMessage.mail}</p>
            </div>
            <div className="bodyAdminMessages">
              <p className="messageMessageAdminMessages">Message:</p>
              <p>{selectedMessage.body}</p>
            </div>
            <div
              onClick={() => deleteMessage(selectedMessage)}
              className="deleteMessageAdminButton"
            >
              <FontAwesomeIcon icon={faTrash} />
              <p>Delete</p>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default AdminMessages;
