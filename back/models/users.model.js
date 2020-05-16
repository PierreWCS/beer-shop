const db = require("./database");

const User = function createUser(user) {
  this.firstname = user.firstname;
  this.lastname = user.lastname;
  this.email = user.email;
  this.password = user.password;
  this.phone = user.phone;
  this.role = user.role;
  this.token = user.token;
};

User.create = (newUser, result) => {
  db.query("INSERT INTO users SET ?", newUser, (error, dbResult) => {
    if (error) {
      return result(error, null);
    }

    return result(null, { id: dbResult.insertId, ...newUser });
  });
};

User.findAll = result => {
  db.query("SELECT * FROM users", (error, dbResult) => {
    if (error) {
      return result(error, null);
    }

    return result(null, dbResult);
  });
};

User.findById = (userId, result) => {
  db.query(`SELECT * FROM users WHERE id = ${userId}`, (error, dbResult) => {
    if (error) {
      return result(error, null);
    }

    if (dbResult.length) {
      return result(null, dbResult[0]);
    }

    // Utilisateur non trouvé
    return result({ kind: "not_found" }, null);
  });
};

User.update = (id, user, result) => {
  db.query("UPDATE users SET ? WHERE id = ?", [user, id], (error, response) => {
    if (error) {
      return result(error, null);
    }

    if (response.affectedRows === 0) {
      // Utilisateur non trouvé
      return result({ kind: "not_found" }, null);
    }

    return result(null, { id: Number(id), ...User });
  });
};

User.newToken = (id, token, result) => {
  db.query(
    `UPDATE users SET token = ? where id=?`, [token, id],
    (error, response) => {
      if (error) {
        return result(error, null);
      }
      if (response.affectedRows === 0) {
        return result({ kind: "not_found" }, null);
      }
      return result(null, { id: Number(id), ...User });
    }
  );
};

User.delete = (id, result) => {
  db.query("DELETE FROM users WHERE id = ?", id, (error, dbResult) => {
    if (error) {
      return result(error, null);
    }

    if (dbResult.affectedRows === 0) {
      // Utilisateur non trouvé
      return result({ kind: "not_found" }, null);
    }

    return result(null, dbResult);
  });
};

module.exports = User;
