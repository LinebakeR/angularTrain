const knex = require("../bbd");
const blogProps = require("./blogProps");

function getAllblogs() {
  return knex(blogProps.tableName).select("*");
}

function getBlog(id) {
  console.log("blogprops", id);
  return knex(blogProps.tableName)
    .select("*")
    .where(blogProps.id, id);
}

function postBlog(data) {
  return knex(blogProps.tableName).insert(data);
}

function deletePost(id){
  return knex(blogProps.tableName)
  .select('*')
  .where(blogProps.id, id)
  .del()
  .then(result => {
    console.log('Post with id : ' + result + 'is deleted ...')
  }).catch(err => console.log('error when deleting', err))
}

module.exports = {
  getAllblogs,
  getBlog,
  postBlog,
  deletePost
};
