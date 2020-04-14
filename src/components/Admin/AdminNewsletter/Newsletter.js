import React, { useEffect, useState } from "react";
import NavBarAdmin from "../NavBarAdmin/NavBarAdmin";
import "./Newsletter.css";
import Axios from "axios";

const Newsletter = () => {
  const [emails, setEmails] = useState(null);

  useEffect(() => {
    getSubscribers();
  }, []);

  const getSubscribers = () => {
    Axios.get("http://localhost:8000/api/emails")
      .then(result => result.data)
      .then(data => {
        let stockEmails = data;
        setEmails([...stockEmails]);
      });
  };
  return (
    <div className="adminNewsletterContainer">
      <NavBarAdmin />
      <div className="subscribersEmailContainer">
        <p className="newsletterTitle">People who subscribe to the newsletter:</p>
        {emails
          ? emails.map(subscriber => {
              return <p>{subscriber.mail}</p>;
            })
          : null}
      </div>
    </div>
  );
};

export default Newsletter;
