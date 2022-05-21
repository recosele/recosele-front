#!/usr/bin/env node

const { choices } = require('./utils');
const inquirer = require('inquirer');
const spawn = require('child_process').spawn;

const prompts = [
  {
    name: 'packages',
    message: '选择要执行的项目:',
    type: 'list',
    pageSize: 11,
    choices,
  },
];

inquirer
  .prompt(prompts)
  .then((answers) => {
    spawn('yarn', ['workspace', answers.packages, process.argv[2]], {
      shell: true,
      stdio: 'inherit',
    });
  })
  .catch((error) => console.log(error));
