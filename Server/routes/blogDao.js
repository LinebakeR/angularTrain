const knex = require('../bbd');
const blogProps = require('./blogProps');

function getAllblogs() {
  return knex(blogProps.tableName).select('*');
}

function getBlog(id) {
  return knex(blogProps.tableName)
    .select('*')
    .where(blogProps.id, id);
}

function editBlog(id, data) {
  return knex(blogProps.tableName)
    .select('*')
    .where(blogProps.id, id)
    .update(data)
    .then(data => data, console.log('DATA FROM DAO', data))
    .catch(error => {
      console.log('error edit', error);
    });
}

function addImg(img) {
  if (img) {
    return knex(blogProps.tableName)
      .insert(img)
      .where(blogProps.images, img);
  }
}

function deletePost(id) {
  return knex(blogProps.tableName)
    .select('*')
    .where(blogProps.id, id)
    .del()
    .then(result => {
      console.log('Post with id  : ' + id + ' is deleted ...');
    })
    .catch(err => console.log('error when deleting', err));
}

function addPost(data) {
  return knex(blogProps.tableName)
    .insert(data)
    .then(result => {
      console.log('Article posted ...', result);
    })
    .catch(err => console.log('Error when posting article', err));
}

module.exports = {
  getAllblogs,
  getBlog,
  addImg,
  deletePost,
  addPost,
  editBlog,
};
