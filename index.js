const axios = require("axios");
const _ = require("lodash");
//provide your token on the next line
axios.defaults.headers.common["Private-Token"] = "put your token here";
//provide your username on the next line
const user = " your username here";
let projectArray = [];
let reposExist = true;

//lists projects 20 at a time and creates an array of project ID's
async function getProjects() {
  await axios
    .get(`https://gitlab.com/api/v4/users/${user}/projects`)
    .then(function(response) {
      const arr = _.map(response.data, "id").forEach(repo => {
        projectArray.push(repo);
      });
    });
}
//takes array of project ID's and deletes the projects
function deleteRepo(projectArray) {
  const arr = _.map(projectArray).forEach(item => {
    axios
      .delete(`https://gitlab.com/api/v4/projects/${item}`)
      .then(() => {
        console.log("deleted project ID: ", item);
      })
      .catch(error => {
        console.log(error);
      });
  });
}

// lists projects and then deletes them 20 at a time.
function deleteAllRepos() {
  getProjects()
    .then(() => {
      if (projectArray.length == 0) {
        console.log("User has no projects.");
        reposExist = false;
      }
      if (projectArray.length < 20) {
        reposExist = false;
      }
      deleteRepo(projectArray);
      projectArray = [];
    })
    .catch(error => {
      console.log(error);
    });
}
//to avoid race exceptions,
const resolveAfter5 = () => new Promise(res => setTimeout(res, 5000));
(async () => {
  while (reposExist) {
    deleteAllRepos();
    await resolveAfter5();
  }
})();
