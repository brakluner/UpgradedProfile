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
      const queryUrl = `https://api.github.com/users/${userName}`;
      axios.get(queryUrl).then(function(result) {
        console.log(result.data);
        printName(result);
        });
  
      })
    } catch (err) {
      console.log(err);
    }
    
  
  } 

  async function printName(result) {
    
    const output = `Profile Name:${result.data.login}
    ${result.data.avatar_url}
    Public Repos:${result.data.public_repos}
    Followers:${result.data.followers}
    `
    await writeFileAsync("index.pdf", output)
    console.log(output)
  }
