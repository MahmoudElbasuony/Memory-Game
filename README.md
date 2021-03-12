# Memory gamme api & ui 

This application build with express.js, vue.js , postgresql for supporting memory-game 
## Installation

Use the package manager npm to install dependencies in package.json 
```bash
npm install
```

## Usage
**To build the app :**
```
CD ./api
npm run build
```

**To  Run the api application**
```
CD ./api
npm start
```

**To Run tests :**
```
CD ./api
npm test
```


## Quick description of solution architecture.
# /api => Backend
## Libraries used at back end:
- **express.js** : the most common framework that faciliates building endpoint over node.js
- **winston** : simple touse an configure logger with high extensibility to add new awayf dor logging
- **CORS** : Cross-Origin Resource sharing libraray that allow cross origin calling
- **dotenv** : environment variable reader from .env
- **joi** : model schema validation
- **pg** : PostgreSQL driver 
- **jest** : jest was used as test runner , assertion library and mocking support tool
***
## Folder Structure :
- **/src** : source code root folder
    - **/config** : contains 'config.json' and  .env file for environment variables 
    - **/controllers** : contains controllers that envolve http endpoints handlers
    - **/cross-cutting** : contains the most shared code accross the project [like custom api errors , error handlers ,utilities , loggers and constants  ]
    - **/db** : contains dAtabase stuff like connection , pool  , application queries and scripts required to create database and tables
    - **/models** : contains database model like : base entity and turn entity
    - **/routes** : contains application global routes and sub routes 
    - **/services** : contains bussiess servcies and it represents in-middle layer between database and controller
    - **/swagger** : contains swagger stuff like configuration for swagger 
    - **/validations** : holds controllers end points paramters model 
- **/test** :  test folder 
***
# /ui  => FrontEnd


## Libraries used at front end:
- **vue.js** : simple progressive framework was used due to its simplicty to handle dom mamangment and  component resuability.

- **jest** : jest was used as test runner , assertion library and mocking support tool 
***

## UI Application Structure

- src
    -  components
        - App.test.js
        - App.vue
    -  index.js
    -  polyfills.js
- static
    - favicon.ico
- README.md
- index.ejs
- package.json
- poi.config.js

The following command used to fast initiated vue.js application structure 
```
npx create-vue-app
```

This application is supposed to be **Progressive Web App (PWA)** 


> memory game using vue.js 

## Commands

```bash
# build for production
npm run build

# development mode
npm run dev

# run unit tests
npm test

# serve the bundled dist folder in production mode
npm run serve
```

## Polyfills

By default we only polyfill `window.Promise` and `Object.assign`. You can add more polyfills in `./src/polyfills.js`.

## Analyze bundle size

Run `npm run report` to get a report of bundle size which helps you:

- Realize what's really inside your bundle
- Find out what modules make up the most of it's size
- Find modules that got there by mistake
- Optimize it!

## Progress Web App

Your app is now offline-ready (only in production bundle), which means you can visit it without network.

Here we use a default [manifest.json](./static/manifest.json) to configurure your pwa, for example, to enable *Add to Home Screen* feature on Android. It will be copied directly to `./dist/manifest.json`.


For all the available options, please head to [poi-preset-offline](https://github.com/egoist/poi/tree/master/packages/poi-preset-offline#api).

---

