/// This file acts as a main script
// Good practice is to place it in the root folder of the project

/// Note: semicolumns ; are not mandatory in TS !
// You can still write them tho. Prettier uses them.

/// Allow stack-traces to point errors in TS files instead of JS files from /dist
require("source-map-support").install(); /// Requires `npm i --save-dev @types/node`

/// Do some work

console.log("I am the main file. I am the boss.");

/* 
  /// Import other TS file
  import { helloWorld } from "./src/scripts/helloWorld";
  // const helloWorld = require("./src/scripts/helloWorld");

  /// Import legacy JS file
  import { potato } from "./public/scripts/legacy";
  // const legacy = require("./src/scripts/legacy");

  /// import can be used to import specific parts of the file
  /// require() imports the whole file
  /// require() caches its results. So, the first time a module is required, then its initialization code runs. After that, the cache just returns the value of module.exports without running the initialization code again. This is a very desirable feature of node.js modules.

  helloWorld;
  potato;
  console.debug(
    `%cAlternatively, you can call your imports using '[YOUR_IMPORT]();'`,
    "color: green"
  );
  helloWorld();
  potato();
*/

/// Launch server in default browser
const express = require("express"); // Requires `npm i express`
const app = express();

app.use(express.static("public"));

var path = require("path");
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "./../public/webpages/index.html"));
});
app.listen(500);
