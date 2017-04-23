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

export const Users = db.Collection.extend({
  model: User
});
export const Posts = db.Collection.extend({
  model: Post
});

export const dbIdToNodeId = (dbId, tableName) => {
  return `${tableName}:${dbId}`;
};

export const splitNodeId = nodeId => {
  const [ tableName, dbId ] = nodeId.split(':');
  return { tableName, dbId };
}
