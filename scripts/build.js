#!/usr/bin/env node

const { choices } = require('./utils');
const inquirer = require('inquirer');
const spawnSync = require('child_process').spawnSync;
const chalk = require('chalk');

const prompts = [
  {
    name: 'all',
    message: '是否 build 所有项目:',
    type: 'confirm',
  },
  {
    name: 'packages',
    message: '选择要 build 的项目:',
    when: (answers) => !answers.all,
    type: 'checkbox',
    pageSize: 11,
    choices,
  },
  // {
  //   name: 'build',
  //   message: '请选择 build 方式:',
  //   type: 'checkbox',
  //   pageSize: 2,
  //   choices: [
  //     {
  //       name: 'prod',
  //       value: 'build',
  //     },
  //     {
  //       name: 'dev',
  //       value: 'build:dev',
  //     },
  //   ],
  // },
];

if (!!process.argv[2]) {
  spawnSync('yarn', ['workspace', process.argv[2], 'build'], { stdio: 'inherit' });
} else {
  inquirer
    .prompt(prompts)
    .then((answers) => {
      const packages = answers.all ? choices : answers.packages;
      console.log(chalk.green(`正在 build ${packages.length}个项目，请等待...`));
      for (let j = 0; j < packages.length; j++) {
        console.log(chalk.green(`正在处理第${j + 1}个项目: ` + packages[j]));
        spawnSync('yarn', ['workspace', packages[j], 'build'], { stdio: 'inherit' });
      }
    })
    .catch((error) => console.log(error));
}
