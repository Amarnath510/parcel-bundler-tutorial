# Parcel Bundler tutorial

### [Parcel](https://parceljs.org/)
- Zero configuration web-application bundler. Just give input as start file (like `parcel index.html`) and it will bundle all the dependencies and put it under a `dist` directory where you will have all the dependents that are included in your `index.html` and so-forth(which might in-turn have other included files etc)
- Install [parcel-bundler dependency](https://www.npmjs.com/package/parcel-bundler) as a **dev-dependency**, `npm i -D parcel-bundler` because we only need this during development and to generate build
- Use this for small projects as this doesn't require any configurations like `Webpack`
- It has in-built babel so it converts `latest JS` into `browser compatible one like ES5`
- It also converts your `SCSS` files to `CSS` with zero configurations
- Also has a in-built live server where refresh automatically happens when something is changed. Really helpful during development
- Include it as part of the scripts, use `npm run dev` to run app using `parcel`
- Don't use bundlers as a server in prod. In Prod, use them only for build purpose and during development as a live server. For Prod use simple server like `express` (usage explained below).

<img width="736" alt="parcel-features" src="https://user-images.githubusercontent.com/4599623/87525917-c7ac0900-c6a7-11ea-9a23-f25a0d8d1a57.png">

## Setup
- `mkdir parcel-tutorial && cd parcel-tutorial`
- npm init (give all default values by pressing enter)

## Install Parcel as dev dependency
- `npm i -D parcel-bundler` // Any bundler is needed only during development and for builds. Don't use these to run in Prod

## Project structure
```
  [app] -- package.json
           [src] -- index.html
                    [javascript] -- js files
                    [sass] -- sass partials
                    [images] -- images

```

## How files are included?
- Parcel parses all files and generate build files in dist folder
- It takes input the root file which is `index.html`
- **JS** root file (say `main.js`) is included in `index.html` so Parcel starts with root JS file and picks all the included files from here on
- **CSS**: Don't use CSS, kinda boring use **Sass**
- **Sass:** Where do we include it? Don't included Sass main file(`main.scss`) in `index.html` instead include it in `main.js` file just like any other JS file,
  ```
  import { add } from './calculate';
  import './styles/main.scss'; // You can import your root css file too here.

  // your JS code
  ```
- And include all your partials(by creating directories under `sass`) in `main.scss` file so all of these will be available through out the app
- **NOTE** If the project structure is not as above then assets won't be copied to the `dist` directory. In these cases, we'll need [parcel-plugin-static-files-copy](https://www.npmjs.com/package/parcel-plugin-static-files-copy) and as suggested in the docs update `package.json` file as below,
  ```
  // package.json
  {
    ...
    "staticFiles": {
        "staticPath": ["public", "vendor/public"]
    }
  }
  ```

## Run parcel
- Change package.json file,
  ```
  "scripts": {
    "dev": "parcel src/index.html",
    "build": "parcel build src/index.html"
  }
  ```
- Run, `npm run dev` to run the application
- Run for Prod, `npm run build` to generate production build for the same
- **NOTE:** The difference between above two commands is the size of the generated build also former one is readable than later,
  ```
  > rm -rf dist
  > npm run dev
  > ls -Slhr // note the size
  > rm -rf dist
  > npm run prod
  > ls -Slhr // compare the file sizes
  ```
  
## Deploy Parcel build in Heroku (same process for Webpack too, actually this example is from webpack source ;))
- Now we have a build and we cannot run parcel direclty on production
- We need a simple server like `express` and deploy our build
- Install `express` server, `npm i express`
- Create a `server.js` file under project root which will listen to the requests coming for this address and serve the required files
  ```
  const path = require('path');
  const express = require('express');
  const app = express();
  app.use(express.static(path.join(__dirname, 'dist'))); // serves static files from `dist` directory
  app.listen(process.env.PORT || 8080); // listens to the port given by heroku or default port as 8080
  ```
- Update `scripts` in `package.json`
  ```
  "scripts": {
    "dev": "parcel src/index.html",
    "build": "parcel build src/index.html"
    "start": "node server.js",  // for Heroku deployment
    "heroku-postbuild": "parcel build src/index.html" // for Heroku deployment
  }
  ```
- `git commit and push` all changes
- `git push heroku master`
- If everything is fine then hit, https://parcel-bundler-simple-tutorial.herokuapp.com/

<img width="1152" alt="parcel-bundler-tutorial-output" src="https://user-images.githubusercontent.com/4599623/87678468-9a8b5380-c798-11ea-97a1-322e2e9ce6ba.png">


## Reference:
- [Parcel Bundler - A SUPER Easy JavaScript Bundler for your Projects](https://www.youtube.com/watch?v=OK6akGZCC88)
- [Deploy your Webpack apps to Heroku in 3 simple steps](https://codeburst.io/deploy-your-webpack-apps-to-heroku-in-3-simple-steps-4ae072af93a8)
- [Deploying webpack to Heroku](https://stackoverflow.com/a/41902436/967638) also check the github link in this answer
