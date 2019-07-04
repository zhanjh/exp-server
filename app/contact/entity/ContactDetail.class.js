const userIDField = 'UserID';
const typeField = 'ContactDetailType';
const contentField = 'ContactDetailContent';

class ContactDetail {
  constructor(data) {
    this.userId = parseInt(data[userIDField]);
    this.type = data[typeField].trim();
    this.content = data[contentField].trim();
  }
}

module.exports = ContactDetail;
