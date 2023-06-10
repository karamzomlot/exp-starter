#!/usr/bin/env node

import { exec } from 'child_process';
import chalk from 'chalk';
import generateExpressStructure from '../index.js';

const args = process.argv.slice(2);
let directoryName = args[0] || 'my-express-app';

if(directoryName === '.') {
  directoryName = process.cwd();
}

generateExpressStructure(directoryName);

console.log(`\nInstalling dependencies...`);
const installDependencies = exec(`cd ${directoryName} && npm i express dotenv cross-env compression && npm i nodemon -D && cd ..`);

installDependencies.stdout.on('data', (data) => {
  console.log(data);
});

installDependencies.stderr.on('data', (data) => {
  console.log(data);
});

installDependencies.on('exit', (code) => {

  if (code !== 0) {
    console.log(chalk.bgRed(`\nDependencies installation failed!`));
    console.log(chalk.bgRed(`\nPlease run the following commands:`));
    console.log(`\ncd ${directoryName}`);
    console.log('npm i express dotenv cross-env compression');
    console.log('npm i nodemon -D');
    return;
  };

  console.log(`\nDependencies installed successfully!`);
  console.log('\n' + chalk.green('Get Started:'));
  console.log(chalk.cyan(`\ncd ${directoryName}`));
  console.log(chalk.cyan('npm run dev'));
  console.log(chalk.bgBlue('\nHappy hacking!'));
});


