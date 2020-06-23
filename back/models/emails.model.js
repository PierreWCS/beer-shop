const db = require("./database");

const Email = function(mail) {
  this.id = mail.id;
  this.mail = mail.mail;
};

Email.create = (newMail, result) => {
  db.query("INSERT INTO emails SET ?", newMail, (error, dbResult) => {
    if (error) {
      return result(error, null);
    }
    return result(null, { id: dbResult.insertId, ...newMail });
  });
};

Email.findAll = result => {
  db.query("SELECT * FROM emails", (error, dbResult) => {
    if (error) {
      return result(error, null);
    }
    return result(null, dbResult);
  });
};

// Delete product with ID

Email.delete = (id, result) => {
  db.query("DELETE FROM emails WHERE id = ?", id, (error, dbResult) => {
    if (error) {
      return result(error, null);
    }

    if (dbResult.affectedRows === 0) {
      //  not found the product with the id
      return result({ kind: "not found" }, null);
    }

    return result(null, dbResult);
  });
};

module.exports = Email;
