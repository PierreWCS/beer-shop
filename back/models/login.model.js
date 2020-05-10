const db = require('./database');

const Login = function loginObject(login) {
  this.email = login.email || null;
  this.password = login.password || null;
};

Login.connect = function userConnect(email, result) {
  db.query('SELECT * FROM users WHERE email = ?', [email], (err, dbResult) => {
    if (err) {
      return result({ err, status: 500 }, null);
    }
    if (!dbResult.length) {
      return result({ status: 404 }, null);
    }
    return result(null, dbResult[0]);
  });
};

module.exports = Login;
