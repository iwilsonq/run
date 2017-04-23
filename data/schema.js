const Schema = {
  users: {
    id: { type: 'increments', nullable: false, primary: true },
    name: { type: 'string', maxlength: 150, nullable: false },
    about: { type: 'string', maxlength: 500 }
  },
  user_friends: {
    user_id_a: { type: 'integer', nullable: false, unsigned: true },
    user_id_b: { type: 'integer', nullable: false, unsigned: true }
  },
  posts: {
    id: {type: 'increments', nullable: false, primary: true},
    user_id: {type: 'integer', nullable: false, unsigned: true},
    title: {type: 'string', maxlength: 150, nullable: false},
    html: {type: 'text', maxlength: 16777215, fieldtype: 'medium', nullable: false},
    created_at: {type: 'dateTime', nullable: false},
    updated_at: {type: 'dateTime', nullable: true}
  }
}

module.exports = Schema;
