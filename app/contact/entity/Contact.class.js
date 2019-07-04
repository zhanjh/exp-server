const userIDField = 'UserID';
const titleField = 'Title';
const nameField = 'Name';
const birthDateField = 'BirthDate';
const isFavoriteField = 'IsFavorite';
const detailCountField = 'DetailCount';

class Contact {
  constructor(data) {
    this.userId = parseInt(data[userIDField]);
    this.title = data[titleField].trim();
    this.name = data[nameField].trim();
    this.birthDate = data[birthDateField];
    this.isFavorite = parseInt(data[isFavoriteField]) === 1;
    this.detailCount = parseInt(data[detailCountField]);
  }

  setDetails(details) {
    this.details = details;
  }
}

module.exports = Contact;
