import { mkdirSync, writeFileSync } from 'fs';
import {
  appFile,
  controllerIndexFile,
  homeControllerFile,
  indexFile,
  routerIndexFile,
} from './fielsContent.js';

function generateExpressStructure(dirName) {
  if (dirName !== process.cwd()) mkdirSync(dirName);

  mkdirSync(`${dirName}/server`);
  mkdirSync(`${dirName}/public`);

  // Create the subdirectories of the server directory
  mkdirSync(`${dirName}/server/controller`);
  mkdirSync(`${dirName}/server/database`);
  mkdirSync(`${dirName}/server/database/config`);
  mkdirSync(`${dirName}/server/database/query`);
  mkdirSync(`${dirName}/server/router`);
  mkdirSync(`${dirName}/server/utils`);
  mkdirSync(`${dirName}/server/utils/validation`);
  mkdirSync(`${dirName}/server/utils/jwt`);
  mkdirSync(`${dirName}/server/middlewares`);

  // Create the other necessary files for the express app
  writeFileSync(`${dirName}/server/index.js`, indexFile);
  writeFileSync(`${dirName}/server/app.js`, appFile);
  writeFileSync(
    `${dirName}/server/controller/homeController.js`,
    homeControllerFile
  );
  writeFileSync(`${dirName}/server/controller/index.js`, controllerIndexFile);
  writeFileSync(`${dirName}/server/database/index.js`, '');
  writeFileSync(`${dirName}/server/database/config/index.js`, '');
  writeFileSync(`${dirName}/server/database/query/index.js`, '');
  writeFileSync(`${dirName}/server/router/index.js`, routerIndexFile);
  writeFileSync(`${dirName}/server/utils/index.js`, '');
  writeFileSync(`${dirName}/server/utils/validation/index.js`, '');
  writeFileSync(`${dirName}/server/utils/jwt/index.js`, '');
  writeFileSync(`${dirName}/server/middlewares/index.js`, '');
  writeFileSync(`${dirName}/.gitignore`, 'node_modules/\n.env');
  writeFileSync(`${dirName}/.env`, 'PORT=8080');
  writeFileSync(`${dirName}/example.env`, '');

  const name = dirName.split('/').pop();

  writeFileSync(
    `${dirName}/package.json`,
    JSON.stringify(
      {
        name: name,
        version: '1.0.0',
        description: '',
        main: 'index.js',
        scripts: {
          dev: 'cross-env NODE_ENV=development nodemon server/index.js',
          start: 'cross-env NODE_ENV=production node server/index.js',
        },
      },
      null,
      2
    )
  );
}

export default generateExpressStructure;
