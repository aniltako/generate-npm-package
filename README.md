# generate npm package
This is cli to create boiler plate for npm package project.

## Usage
### create npm package project
`$ generate-npm-package`

![create](https://user-images.githubusercontent.com/18716334/64155422-78c00100-ce52-11e9-94b5-273ecbca0366.png)

| Options               | Default               | Description                       |
| :---------            |:------------------    | :---------------------------      |
| project name          | create-npm-package    | npm package name or project name  |
| semacntic releease    | false or No           | add semantic denpendencies  |
| travis setup          | false or No           | config travis setup .travis.yml  |
| install dependencies  | false or No           | install project dependencies after creating project  |

### [Semantic Release](https://www.npmjs.com/package/semantic-release-cli)

```
npm install -g semantic-release-cli
cd your-module
semantic-release-cli setup
```
<img width="601" alt="semantic" src="https://user-images.githubusercontent.com/18716334/64156905-5ed3ed80-ce55-11e9-8a46-11818ad776ca.png">



### Travis CI  [Setup](https://github.com/marketplace/travis-ci/plan/MDIyOk1hcmtldHBsYWNlTGlzdGluZ1BsYW43MA==#pricing-and-setup)

### Project Structure
![project](https://user-images.githubusercontent.com/18716334/64142636-92e6e880-ce2c-11e9-925f-804bf8e86b36.png)


| File/Folder      | Descriptions |
| :--------- | :----- |
| project/index.js  | entry file while creating npm module. |
| src/lib/index.js     |   main file that you want to publish in npm. |
| src/lib/index.spec.js      |    test file for above file.|
| styles/ | folder for styles if you are creating UI npm module.|
| test/index.js | for testing build files after build. |
| .travis.yml | for Travis CI |

### Commands
- Run project ( will start project with watch-bootstrap and watch-custom ) webpack.dev.config.js </br>
`npm start`

- Run Test ( will run test for src/lib/index.spec.js ) </br>
`npm run test`

- Build ( will bundle the src/lib/index.js to /build folder ) webpack.prod.config.js </br>
`npm run build`

- Test Build ( will test the build module /build/index.js ) </br>
`npm run test-build`

### Create Simple NPM package
`cd your-module`

#### Install Dependencies
`npm installl`

#### Add Git Link 
`package.json`

```javascript
"repository": {
    "type": "git",
    "url": "git_repository_link"
}
```

#### npm publish - [Using Semanctic Release](https://www.npmjs.com/package/commitizen)
```
npm install -g commitizen
npm run commit
git push
```

#### npm publish - without Semantic Release [LInk](https://docs.npmjs.com/cli/publish)

```
npm build
npm login
npm publish
```