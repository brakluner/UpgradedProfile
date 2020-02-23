const fs = require("fs");
const inquirer = require("inquirer");
const open = require("open");
const axios = require("axios");
const convertFactory = require("electron-html-to");
const path = require("path");



getData();

function getData() {
    inquirer.prompt([
    {
      type: "input",
      message: "Whats ur github name",
      name: "userName"
    },
    {
      type: "list",
      message: "Whats ur fave color",
      name: "userColor",
      choices: [
        "red",
        "blue",
        "green",
        "purple"
      ]
    },
    ]).then(function({ userName, userColor }) {
      const queryUrl = `https://api.github.com/users/${userName}`;
      axios.get(queryUrl).then(function(result) {
        console.log(result.data);
        printName(result, userColor);
        });
  console.log(userColor)
      })
    }  

function printName(result, userColor) {
console.log(userColor)
  const color = {
    red: {
      wrapperBackground: "#ff0052",
      headerBackground: "#ff5200",
      headerColor: "black",
      photoBorderColor: "#black"
    },
    blue: {
      wrapperBackground: "#22dcff",
      headerBackground: "#2289ff",
      headerColor: "white",
      photoBorderColor: "#6b7aaf"
    },
    green: {
      wrapperBackground: "#00ffbb",
      headerBackground: "#00ba1f",
      headerColor: "white",
      photoBorderColor: "#4bffa8"
    },
    purple: {
      wrapperBackground: "#bd4bff",
      headerBackground: "#9200b2",
      headerColor: "white",
      photoBorderColor: "#eb8eff"
    }
  };
  
    const output = `<!DOCTYPE html>
<html lang="en">
   <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta http-equiv="X-UA-Compatible" content="ie=edge" />
      <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css"/>
      <link href="https://fonts.googleapis.com/css?family=BioRhyme|Cabin&display=swap" rel="stylesheet">
      <title>Document</title>
      <style>
          @page {
            margin: 0;
          }
         *,
         *::after,
         *::before {
         box-sizing: border-box;
         }
         html, body {
         padding: 0;
         margin: 0;
         }
         html, body, .wrapper {
         height: 100%;
         }
         .wrapper {
         background-color: ${color[userColor].wrapperBackground};
         padding-top: 100px;
         }
         body {
         background-color: white;
         -webkit-print-color-adjust: exact !important;
         font-family: 'Cabin', sans-serif;
         }
         main {
         background-color: #E9EDEE;
         height: auto;
         padding-top: 30px;
         }
         h1, h2, h3, h4, h5, h6 {
         font-family: 'BioRhyme', serif;
         margin: 0;
         }
         h1 {
         font-size: 3em;
         }
         h2 {
         font-size: 2.5em;
         }
         h3 {
         font-size: 2em;
         }
         h4 {
         font-size: 1.5em;
         }
         h5 {
         font-size: 1.3em;
         }
         h6 {
         font-size: 1.2em;
         }
         .photo-header {
         position: relative;
         margin: 0 auto;
         margin-bottom: -50px;
         display: flex;
         justify-content: center;
         flex-wrap: wrap;
         background-color: ${color[userColor].headerBackground};
         color: ${color[userColor].headerColor};
         padding: 10px;
         width: 95%;
         border-radius: 6px;
         }
         .photo-header img {
         width: 250px;
         height: 250px;
         border-radius: 50%;
         object-fit: cover;
         margin-top: -75px;
         border: 6px solid ${color[userColor].photoBorderColor};
         box-shadow: rgba(0, 0, 0, 0.3) 4px 1px 20px 4px;
         }
         .photo-header h1, .photo-header h2 {
         width: 100%;
         text-align: center;
         }
         .photo-header h1 {
         margin-top: 10px;
         }
         .links-nav {
         width: 100%;
         text-align: center;
         padding: 20px 0;
         font-size: 1.1em;
         }
         .nav-link {
         display: inline-block;
         margin: 5px 10px;
         }
         .workExp-date {
         font-style: italic;
         font-size: .7em;
         text-align: right;
         margin-top: 10px;
         }
         .container {
         padding: 50px;
         padding-left: 100px;
         padding-right: 100px;
         }

         .row {
           display: flex;
           flex-wrap: wrap;
           justify-content: space-between;
           margin-top: 20px;
           margin-bottom: 20px;
         }

         .card {
           padding: 20px;
           border-radius: 6px;
           background-color: ${color[userColor].headerBackground};
           color: ${color[userColor].headerColor};
           margin: 20px;
         }
         
         .col {
         flex: 1;
         text-align: center;
         }

         a, a:hover {
         text-decoration: none;
         color: inherit;
         font-weight: bold;
         }

         @media print { 
          body { 
            zoom: .75; 
          } 
         }
      </style>
   </head>
   <body>
      <div class="wrapper">
         <div class="photo-header">
            <img src="${result.data.avatar_url}" alt="Photo of ${result.data.name}" />
            <h1>Hi!</h1>
            <h2>
            My name is ${result.data.name}!</h1>
            <h5>${result.data.company ? `Currently @ ${result.data.company}` : ""}</h5>
            <nav class="links-nav">
               ${
                 result.data.location
                   ? `<a class="nav-link" target="_blank" rel="noopener noreferrer" href="https://www.google.com/maps/place/${
                       result.data.location
                     }"><i class="fas fa-location-arrow"></i> ${
                       result.data.location
                     }</a>`
                   : ""
               }
               <a class="nav-link" target="_blank" rel="noopener noreferrer" href="${
                 result.data.html_url
               }"><i class="fab fa-github-alt"></i> GitHub</a>
               ${
                 result.data.blog
                   ? `<a class="nav-link" target="_blank" rel="noopener noreferrer" href="${
                       result.data.blog
                     }"><i class="fas fa-rss"></i> Blog</a>`
                   : ""
               }
            </nav>
         </div>
         <main>
            <div class="container">
            <div class="row">
               <div class="col">
                  <h3>${result.data.bio ? `${result.data.bio}` : ""}</h3>
               </div>
               </div>
               <div class="row">
               <div class="col">
                  <div class="card">
                    <h3>Public Repositories</h3>
                    <h4>${result.data.public_repos}</h4>
                  </div>
               </div>
                <div class="col">
                <div class="card">
                  <h3>Followers</h3>
                  <h4>${result.data.followers}</h4>
                </div>
               </div>
               </div>
               <div class="row">
               <div class="col">
               <div class="card">
                  <h3>GitHub Stars</h3>
                  <h4>${result.data.stars}</h4>
                  </div>
               </div>
                <div class="col">
                <div class="card">
                  <h3>Following</h3>
                  <h4>${result.data.following}</h4>
                  </div>
               </div>
               </div>
            </div>
         </main>
      </div>
   </body>
</html>
    `
    console.log(output)
render();
    function render() {
      const conversion = convertFactory({
        converterPath: convertFactory.converters.PDF
      });

      conversion({ html: output }, function(err, result) {
        if (err) {
          return console.error(err);
        }
        result.stream.pipe(
          fs.createWriteStream(path.join(__dirname, "index.pdf"))
        );
        conversion.kill();
      });

      open(path.join(process.cwd(), "index.pdf"));
    };
  }
   
  

