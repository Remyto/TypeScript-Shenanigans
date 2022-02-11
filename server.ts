/// This file acts as a main script

/// Note: semicolumns ; are not mandatory in TS !
// You can still write them tho

/// Allow stack-traces to point errors in TS files instead of JS files from /dist
require("source-map-support").install(); /// Requires `npm i --save-dev @types/node`

/// Import other TS files
import { helloWorld } from "./src/scripts/helloWorld"
/// Import legacy JS file
const legacy = require("./src/scripts/legacy")

console.log("I am the main file. I am the boss.");

helloWorld();
legacy.potato();
