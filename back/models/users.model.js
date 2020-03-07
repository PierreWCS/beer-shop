const db = require('./database');

const User = function createUser(user) {
  this.firstname = user.firstname;
  this.lastname = user.lastname;
  this.email = user.email;
  this.password = user.password;
  this.phone = user.phone;
  this.role = user.role;
};

User.findPartInfo = (userId, result) => {
  db.query(
    `SELECT users.lastname, users.firstname, users.email, users.phone
      FROM users
      where users.id = ?`,
    userId,
    (error, dbResult) => {
      if (dbResult.length) {
        return result(null, dbResult);
      }
      return result({ kind: 'not_found' }, null);
    }
  );
};

User.findDeliverInfo = (userId, result) => {
  db.query(
    `SELECT users.lastname, users.firstname, users.email, users.phone, users.delivery_man_id,
      delivery_man.id, delivery_man.address, delivery_man.perimeter, delivery_man.is_pro, delivery_man.rib
      FROM users
      JOIN delivery_man ON delivery_man.id = users.delivery_man_id
      where users.id = ?`,
    userId,
    (error, dbResult) => {
      if (dbResult.length) {
        return result(null, dbResult);
      }
      return result({ kind: 'not_found' }, null);
    }
  );
};

User.findProfessionalInfo = (userId, result) => {
  db.query(
    `SELECT users.lastname, users.firstname, users.email, users.phone, users.professional_id, users.delivery_man_id,
      professional.id, professional.kbis, professional.siret, professional.tva,
      delivery_man.id, delivery_man.address, delivery_man.perimeter, delivery_man.is_pro, delivery_man.rib
      FROM users
      JOIN delivery_man ON delivery_man.id = users.delivery_man_id
      JOIN professional ON professional.id = users.professional_id
      where users.id = ?`,
    userId,
    (error, dbResult) => {
      if (dbResult.length) {
        return result(null, dbResult);
      }
      return result({ kind: 'not_found' }, null);
    }
  );
};

User.create = (newUser, result) => {
  db.query('INSERT INTO users SET ?', newUser, (error, dbResult) => {
    if (error) {
      return result(error, null);
    }

    return result(null, { id: dbResult.insertId, ...newUser });
  });
};

User.findAll = result => {
  db.query('SELECT * FROM users', (error, dbResult) => {
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
    return result({ kind: 'not_found' }, null);
  });
};

User.update = (id, user, result) => {
  db.query('UPDATE users SET ? WHERE id = ?', [user, id], (error, response) => {
    if (error) {
      return result(error, null);
    }

    if (response.affectedRows === 0) {
      // Utilisateur non trouvé
      return result({ kind: 'not_found' }, null);
    }

    return result(null, { id: Number(id), ...User });
  });
};

User.delete = (id, result) => {
  db.query('DELETE FROM users WHERE id = ?', id, (error, dbResult) => {
    if (error) {
      return result(error, null);
    }

    if (dbResult.affectedRows === 0) {
      // Utilisateur non trouvé
      return result({ kind: 'not_found' }, null);
    }

    return result(null, dbResult);
  });
};

module.exports = User;
