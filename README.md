# Parcel tutorial

### [Parcel](https://parceljs.org/)
- Zero configuration web-application bundler. Just give input as start file like `parcel index.html` and it will generate a `dist` directory where you will have all the dependents that are included in your `index.html` and so-forth(which might in-turn have other included files etc)
- [parcel-bundler dependency](https://www.npmjs.com/package/parcel-bundler). Install it as dev dependency, `npm i -D parcel-bundler`
- Use this for small projects as this doesn't require any configurations like `Webpack`
- It has in-built babel so it converts `latest JS` into `browser compatible one like ES5`
- It also convert your `SCSS` files to `CSS` .. with zero configurations
- It also have a in-built live server where refresh automatically happens when something is changed
- Include it as part of the scripts, use `npm run dev` to run app using `parcel`

## Setup
- `mkdir parcel-tutorial && cd parcel-tutorial`
- npm init (give all default values by pressing enter)

## Install Parcel
- npm i -D parcel-bundler

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
- **JS** root file (say `main.js`) is included in index.html so Parcel starts with this file for JS and pick all the included files from here on
- **CSS**(don't use CSS kinda boring use **Sass**) root file (say `main.css`) is included in index.html so it parses those too. But we will use **Sass** for our project so how do we include it?
- Don't included Sass main file in index.html instead include it in `main.js` file just like any other JS file,
  ```
  import { add } from './calculate';
  import './styles/main.scss'; // You can import your root css file too here.

  // your JS code
  ```
- And put all your partials included in the `main.scss` file so that all these are available through out the app

## Run parcel
- Change package.json file,
```
"scripts": {
  "dev": "parcel src/index.html",
  "prod": "parcel build src/index.html"
}
```
- Run, `npm run dev` to run the application
- Run for Prod, `npm run prod` to generate production build for the same
