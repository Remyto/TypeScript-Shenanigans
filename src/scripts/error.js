/// This files throws an error
/// Allow stack-traces to point errors in TS files instead of JS files from /dist
require("source-map-support").install(); /// Requires `npm i --save-dev @types/node`
var a = "this is bad";
throw new Error(a);
//# sourceMappingURL=error.js.map