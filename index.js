#!/usr/bin/env node

const program = require('commander')
// console.log('prohub-cli 脚手架');
const download = require('download-git-repo')
const handlebars = require('handlebars')
const inquirer = require('inquirer')
const fs = require('fs')
const ora = require('ora')
const chalk = require('chalk')
const logSymbols = require('log-symbols')
program
    .version('0.1.0')
const templates = {
    'tpl-1': {
        url: 'https://github.com/famensaodiseng/prohub.js.git',
        downloadUrl: 'https://github.com:yangfangtao/TeamNo-1#master',
        description: '模版1'
    },
    'tpl-2': {
        url: 'https://github.com/famensaodiseng/prohub.js.git',
        downloadUrl: 'https://github.com:yangfangtao/TeamNo-1#master',
        description: '模版2'
    }
}
program
    .command('init <template> <project>')
    .description('初始化项目模块')
    .action((templateName, projectName) => {
        //下载之前做loding提示
        const spinner = ora('正在下载模版中...').start();
        //download 第一个参数是github仓库地址,第二个是下载路径
        const {
            downloadUrl
        } = templates[templateName]
        download(downloadUrl, projectName, {
            clone: true
        }, (err) => {
            if (err) {
                spinner.fail() //下载失败提示
                console.log(logSymbols.success, chalk.red('初始化模版失败'));
                return
            }
            spinner.succeed() //下载成功提示
            //把项目下面的package.json文件读取出来。
            //使用向导的方式采集用户输入的值，
            //使用模板引擎把用户输入的数据解析的到package.json文件中
            //解析完，把解析的结果重新写入package.json文件中
            inquirer.prompt([{
                type: 'input',
                name: 'name',
                message: '请输入项目名称'
            }, {
                type: 'input',
                name: 'description',
                message: '请输入项目简介'
            }, {
                type: 'input',
                name: 'author',
                message: '请输入作者名称'
            }]).then((answers) => {
                //    console.log(answers)
                //把采集到的用户数据解析替换到package.json中
                const packagePath = `${projectName}/package.json`
                const packageContent = fs.readFileSync(packagePath, 'utf-8')
                const packageResult = handlebars.compile(packageContent)(answers)
                //  console.log(packageResult)
                fs.writeFileSync(packagePath, packageResult)
                console.log(logSymbols.success, chalk.yellow('初始化模版成功'))
            })
        })
    });
program
    .command('list')
    .description('查看所有可用模版')
    .action(() => {
        for (let key in templates) {
            console.log(`
            ${key}     ${templates[key].description} `)
        }
    })
program.parse(process.argv);