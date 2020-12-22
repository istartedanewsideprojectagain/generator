const fs = require('fs');
const fse = require('fs-extra');
const Twig =  require('twig');
const pluralize = require('pluralize')

const boilerPlatePath = `./boilerplate`;
const outputDir = `./dist`;


const specs = require('./spec.json');

const replaceAll = (str, find, replace) => {
  return str.replace(new RegExp(find, 'g'), replace);
}

const loadTemplateContent = (path) => {
  const filePath = `${boilerPlatePath}/${path}`
  return fs.readFileSync(filePath,'utf8').toString();
};

const getDirectoryNameFromPath = (path) => {
  let pathArray = path.split("/");
  pathArray.pop();

  return pathArray.join("/");
};

const writeGeneratedFile = (filePath,content) => {
  fs.mkdirSync(`${outputDir}/${getDirectoryNameFromPath(filePath)}`,{ recursive: true });
  fs.writeFileSync(`${outputDir}/${filePath}`, content, 'utf8');
}

const genarateModel = (name,fields) => {
  console.info(`Generating model [${name}]`);
  const ressourceName = name.toLowerCase();
  const ressourceNameWithMaj = name.charAt(0).toUpperCase() + name.slice(1);

  Twig.renderFile(`${boilerPlatePath}/models/model.twig`, {fields:fields, schemaName:ressourceNameWithMaj}, (err, output) => {
    writeGeneratedFile(`models/${ressourceName}Model.js`,output)
  });
};

const genarateController = (name) => {
  console.info(`Generating controller [${name}]`);

  const ressourceName = name.toLowerCase();
  const ressourceNameWithMaj = name.charAt(0).toUpperCase() + name.slice(1);

  let result = loadTemplateContent("controllers/controller.tmpl.js");

  result = replaceAll(result,'{{ ressourceName }}',ressourceName);
  result = replaceAll(result,'{{ ressourceNameWithMaj }}',ressourceNameWithMaj);

  writeGeneratedFile(`controllers/${ressourceName}Controller.js`,result)
};

const generateRouter = (name) => {
  console.info(`Generating router [${name}]`);


  let result = loadTemplateContent("routers/router.tmpl.js");

  const ressourceName = name.toLowerCase();
  const ressourceNameWithMaj = name.charAt(0).toUpperCase() + name.slice(1);

  result = replaceAll(result,'{{ ressourceName }}',ressourceName);
  result = replaceAll(result,'{{ ressourceNameWithMaj }}',ressourceNameWithMaj);


  writeGeneratedFile(`routers/${ressourceName}Router.js`,result)


};

const copy = (path) => {
  fse.copySync(`${boilerPlatePath}/${path}`,`${outputDir}/${path}`);

}


const generateMain = (ressourceList,ressourceListPlural) => {
  Twig.renderFile(`${boilerPlatePath}/app.twig`, {ressources:ressourceList,ressourceListPlural:ressourceListPlural}, (err, output) => {
    writeGeneratedFile(`app.js`,output)
  });
};
const ressourceList = [];
const ressourceListPlural = [];

const generate = (spec) => {
  const ressourceName = Object.keys(spec)[0];
  ressourceList.push(ressourceName);
  ressourceListPlural.push(pluralize(ressourceName));
  const fields = spec[ressourceName].fields;
  genarateModel(ressourceName,fields);
  genarateController(ressourceName);
  generateRouter(ressourceName);
};


const copyFiles = () => {
  //fs.copyFileSync(`${boilerPlatePath}/package.json`,`${outputDir}/package.json`);
  copy(`package.json`)
  copy(`Dockerfile`)
  copy(`helpers`)
  copy(`middleware`)
  copy(`models/accountModel.js`)
  copy(`.env`)
}


fs.rmdirSync(outputDir,{ recursive: true });

specs.data.forEach(spec => {
  generate(spec)
});
generateMain(ressourceList,ressourceListPlural);

copyFiles();
