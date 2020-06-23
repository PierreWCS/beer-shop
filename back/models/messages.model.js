const db = require('./database');

const Message = function(message) {
  this.id = message.id;
  this.title = message.title;
  this.mail = message.mail;
  this.name = message.name;
  this.firstname = message.firstname;
  this.body = message.body;
  this.date = message.date;
};

Message.create = (newMessage, result) => {
  db.query('INSERT INTO messages SET ?', newMessage, (error, dbResult) => {
    if (error) {return result(error, null)}
    return result(null, {id: dbResult.insertId, ...newMessage});
  })
};

Message.findAll = result => {
  db.query('SELECT * FROM messages', (error, dbResult) => {
    if (error) {return result(error, null)}
    return result(null, dbResult);
  })
};

// Delete product with ID

Message.delete = (id, result) => {
  db.query('DELETE FROM messages WHERE id = ?', id, (error, dbResult) => {
    if (error) {
      return result(error, null);
    }

    if (dbResult.affectedRows === 0) {
      //  not found the product with the id
      return result({kind: 'not found'}, null);
    }

    return result(null, dbResult);
  })
};

module.exports = Message;
