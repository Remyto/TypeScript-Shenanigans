# Get TypeScript !

I wrote this tutorial with the help of... Another tutorial (much shame...):
<br>https://www.freecodecamp.org/news/how-to-add-typescript-to-a-javascript-project/

## Install TypeScript

To install TypeScript using NodeJS, run this command: `npm install typescript`

_Note: "-global" installs the depency not just for the current project:_ `npm install -global typescript`

## Coding

Write your TS code in the corresponding folder - That is './src' and its children.

Don't forget to have a look on the project's tree.

## First Compilation

If this is the **first time you compile** your project, you will need to initialize it by running the following command in your root folder: `tsc --init`

This will create a 'tsconfing.json' file.

Alternativeliy, you can get a messy file with a lot of comments using this command. If this happends to you, I advise you use this code for your 'tsconfig.json' file :

```JSON
{
 "compilerOptions": {
   "target": "esnext",
   "module": "commonjs",
   "allowJs": true,
   "checkJs": false,
   "outDir": "dist",
   "rootDir": ".",
   "strict": false,
   "esModuleInterop": true /* Enables emit interoperability between CommonJS and ES Modules via creation of namespace objects for all imports. Implies 'allowSyntheticDefaultImports'. */,
   "forceConsistentCasingInFileNames": true, /* Disallow inconsistently-cased references to the same file. */
   "declaration": true, /* Generates corresponding '.d.ts' file. */
   "strictNullChecks": true,
   "resolveJsonModule": true,
   "sourceMap": true,
   "baseUrl": ".",
   "paths": {
    "*": [
      "*",
      "src/*",
      "src/setup/*",
      "src/logic/*",
      "src/models/*",
      "config/*"
    ]
  },
 },
  "exclude": ["node_modules", "dist"],
  "include": [
    "./src",
    "./test",
    "./*",
    "./config"
  ]
}

```

A few things to notice above:

- We read all the files in the src or test or config directory (using the include flag).
- We accept JavaScript files as inputs (using the allowJs flag).
- We emit all of the output files in build (using the outDirflag).

This file needs to be push in your Git repository.

## Compilation

To compile your TS code (and convert it into JS in the corresponding folder), use the following command in your root folder: `tsc`

_Note regarding '.gitignore': <br>The 'dist' contains the results (that is JS files) of the compilation TS files. It should be ignored. To avoid having to rewrite legacy JS files, we should place such files in the 'src' folder._

## Run the code

Run the generate JS file using for instance node:

`node ./[PATH_TO_YOUR_FILE]/[NAME_OF_YOUR_FILE].js`

For example :

- `node .\server.ts`
- `node .\src\scripts\helloWorld.ts`
- `node .\src\scripts\legacy.js`

# Migration

## Modify your package.json

We want to migrate from this:

```JSON
{
  "scripts": {
    "start": "node ./[YOUR_MAIN_FILE].js",
    "mocha": "mocha --recursive --reporter spec -r test/bootstrap.js",
    "test": "npm run mocha -- test/ -r test/integration/bootstrap.js",
  }
}
```

To this:

```JSON
{
  "scripts": {
    "start": "node ./dist/[YOUR_MAIN_FILE].js",
    "build-dist": "./node_modules/typescript/bin/tsc",
    "mocha": "mocha --recursive --reporter spec -r ./dist/test/bootstrap.js",
    "test": "npm run mocha -- ./dist/test/ -r ./dist/test/integration/bootstrap.js"
  }
}
```

As you can see, most of the changes were about adding the prefix dist to most of our build commands. We also added a build-dist script that compiles our codebase and moves all files to a dedicated folder called dist.

Alternatively, you could use : `"start": "node .\[YOUR_MAIN_FILE].[EXTENSION]",`

## Add source-map support

One of the big issues when adding TypeScript to your project is that you are adding a layer of indirection between the code you write and the code that actually runs in production (since .ts is transpiled  to .js  in run time).

For example, imagine the following TypeScript program:

``` TypeScript
const errorMessage: string = "this is bad"

throw new Error(a)
```
When we run it, it will throw the following stack-trace:

```
Error: this is bad
    at Object.<anonymous> (/Users/dorsev/work/git/example/hello.js:3:7)
```

Wait! but we only have 2 lines in our typescript code!

This is problematic since our code-base contains only .ts files. And since most production code contains hundreds of lines, it will be really time-consuming translating these numbers and files properly.

Luckily for us, there is a solution for this called source-map-support!
<br>This allows us to ensure that stack-traces will have proper .ts file names and line numbers like we are used to :)

This can be done by running `npm install source-map-support` and then adding the following line in the first lines of your application:

`require('source-map-support').install();`

# Usefull tools

These tools are absolutly not mandatory but i think they may come in handy (when i get to understand them properly).

## GITIGNORE generator - Works but DEPRECATED

Generate some file automatically.

**ATTENTION:** This dependency is **deprecated**

Further documentation: https://www.npmjs.com/package/generate-gitignore

### Install the dependency:

`npm install --global generate generate-gitignore`

_Note: 'global' is for general instalation; not just for this project in particular._

### Generate a .gitignore tempalte file use:

`$ gen gitignore`

Press ENTER a few times to complete default generation.
