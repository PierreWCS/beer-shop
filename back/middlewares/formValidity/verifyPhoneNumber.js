const regexValidity = require('./regexValidity');

module.exports = function verifyPassword(phone, validLength) {
  const regex = new RegExp(/^[0-9]+$/);
  const regexError = regexValidity({ phone }, regex);
  if (regexError) return regexError;

  if (phone.length !== validLength || !['6', '7'].includes(phone[0])) {
    return {
      type: 'INPUT',
      inputs: ['phone'],
      alert: {
        type: 'error',
        text: 'Numéro de téléphone invalide.'
      }
    };
  }

  return null;
};
