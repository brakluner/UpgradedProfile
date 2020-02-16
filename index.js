const fs = require("fs");
const inquirer = require("inquirer");
const util = require("util");
const axios = require("axios");

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

getName();

async function getName() {
  try {
    const { userName } = await inquirer.prompt({
      message: "Whats ur github name",
      name: "userName"
    //});
    //const { userColor } = await inquirer.prompt({
    //    message: "Whats ur fave color",
    //    name: "userColor"
    }).then(function({ userName }) {
      const queryUrl = `https://api.github.com/users/${userName}/repos?per_page=100`;
      axios.get(queryUrl).then(function(result) {
        const outputArray = result.data.map(function(datum) {
          return datum.name
        });
  console.log(result);
      })
    const output = `
        ${outputArray}
        `
    await writeFileAsync("index.pdf", output)
    })
    console.log(userName)
  } catch (err) {
    console.log(err);
  }
}