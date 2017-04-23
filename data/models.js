import db from './database';

export const User = db.Model.extend({
  tableName: 'users'
});

export const Post = db.Model.extend({
  tableName: 'posts',
  hasTimestamps: true,
  author: function () {
    return this.belongsTo(User);
  }
});
