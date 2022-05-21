#!/usr/bin/env node

const { choices } = require('./utils');
const inquirer = require('inquirer');
const spawnSync = require('child_process').spawnSync;
const chalk = require('chalk');

const prompts = [
  {
    name: 'all',
    message: '是否 deploy 所有项目:',
    type: 'confirm',
  },
  {
    name: 'packages',
    message: '选择要 deploy 的项目:',
    when: (answers) => !answers.all,
    type: 'checkbox',
    pageSize: 11,
    choices,
  },
];

inquirer
  .prompt(prompts)
  .then((answers) => {
    const rootPath = '';
    console.log(chalk.green(`正在处理项目，请等待...`));
    const packages = answers.all ? choices : answers.packages;
    for (let j = 0; j < packages.length; j++) {
      const name = packages[j];
      console.log(chalk.green(`正在上载 第${j + 1}个项目: ` + `/${name}/*`));
      // Todo: 追加修正deploy
      // spawnSync('scp', ['-r', `./public/${name}`, `${rootPath}`], {
      //   stdio: 'inherit',
      // });
    }
  })
  .catch((error) => console.log(error));
