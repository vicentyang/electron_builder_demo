/*
 * @Author: vicent
 * @Date:   2016-07-28 21:10:43
 * @Last Modified by: vicent
 * @Last Modified time: 2020-09-25 15:44:58
 */

//apiAddress  https://docs.atlassian.com/jira/REST/cloud/#api/2/project-getProject

'use strict';

let fs = require('fs');
let Path = require('path');
// let marked = require('marked');

let config = {
    host: 'jira.makeblock.com',
    port: '443',
    user: '11285',
    password: 'MakeBlock20200102'
}

// iGAMING - 777>>>IGX777
// iGaming - Flamenco Dance>>>IGXFD
// iGAMING - Fruity Bites (IGXFB)>>>IFBI
// iGaming - Galaxy>>>IGG
// iGAMING - Glory of Ares2>>>IGXGOA2
// iGAMING - Happy Farm>>>IGXHF
// iGAMING - King of Pirate>>>IGXKOP
// iGAMING - Opal Beauty>>>IGXOB
// iGAMING - Robyn>>>IGXR
// iGaming - Rolling Gold>>>IGXRG
// iGAMING - Three Kingdoms>>>IGXTK
// iGAMING - Today's Weather>>>IGXTW
// iGAMING - Wild Rose>>>IGXWR
var JiraApi = require('jira-client');

var jira = new JiraApi({
    protocol: 'http',
    host: config.host,
    username: config.user,
    password: config.password,
    apiVersion: '2',
    strictSSL: true
});
// jira.searchUsers({
//     maxResults: 100
// }).then();

// listProjects();  //export all project's bugs

// searProjectResolveBug('SP'); //export special project's bugs
getProject('SP'); //export special project's bugs
// searProjectResolveBug('VF0'); //export special project's bugs
// searProjectResolveBug('VS'); //export special project's bugs


function getUsersIssues() {
    jira.getUsersIssues(config.user, true)
        .then(project => {
            // console.log('index.js>>>46', project);
        })
}

// maxResults
function searchJira(projectName) {
    let sql = `project=${projectName} AND status = Open`; //过滤bug
    // let sql = `project=${projectName} AND status = Open AND priority = High`;//过滤bug
    // let sql = `project=${projectName}`;
    jira.searchJira(sql, {
        maxResults: 200
    }).then((result) => {
        var issues = result.issues;

        console.log('index.js>>>59', result);
        var bugData = {};
        for (let issue of issues) {

            let bugDetial = {};
            if (issue.key) {
                // console.log('index.js>>>49', issue.key);
            }
            bugDetial['Summary'] = issue.fields.summary;
            bugDetial['Description'] = issue.fields.description;
            bugData[issue.key] = bugDetial;
        }

        // console.log('index.js>>>61', bugData);
        exportBugs(projectName, bugData);
        return bugData;

    }, (err) => {
        console.log('index.js>>>58', err);
    });

}
// maxResults
async function searProjectResolveBug(projectName) {
    let sql = `project=${projectName} AND status = 挂起`; //过滤bug
    // let sql = `project=${projectName} AND status = 问题关闭`;//过滤bug
    // let sql = `project=${projectName} AND status = Resolved`;//过滤bug
    // let sql = `project=${projectName} AND status = Open AND priority = High`;//过滤bug
    // let sql = `project=${projectName}`;
    return await jira.searchJira(sql).then((result) => {
        var issues = result.issues;

        // console.log('index.js>>>59', result);
        var bugData = {};
        var exportStr = ''
        for (let issue of issues) {
            // console.log('index.js>>>59', issue.fields);
            let bugDetial = {};
            if (issue.key) {
                var ouput = `*  [[${issue.key}](http://jira.makeblock.com/projects/${projectName}/issues/${issue.key})] ${issue.fields.summary}`
                // console.log(ouput);
                exportStr += ouput + '\n'
            }
            bugDetial['Summary'] = issue.fields.summary;
            bugDetial['Description'] = issue.fields.description;
            bugData[issue.key] = bugDetial;
        }

        console.log('\nresolved bugs num: ---- ', issues.length)
        return issues;
        // console.log('index.js>>>61', bugData);
        if (issues.length > 0) {
            exportBugsHTML(`${projectName}_${getNowFormatDate()}`, marked(exportStr));
        }

    }, (err) => {
        console.log('index.js>>>58', err);
    });

}

//get details of special issue
function findIssue(issueId) {
    let bugDetial = {};
    jira.findIssue(issueId)
        .then(issue => {
            bugDetial['Summary'] = issue.fields.summary;
            bugDetial['Description'] = issue.fields.description;
            // console.log(`Summary: ${issue.fields.summary}`,'\n',`Description: ${issue.fields.description} `);
        })
        .catch(err => {
            console.error(err);
        });

}

//get details of special project
async function getProject(projectName) {
    // console.log(projectName)
    return await jira.getProject(projectName)
        .then(project => {
            // console.log('index.js>>>46', project);
            return project
        }).catch((err) => {
            console.log('err', err);
        })
}

// list all igaming projects
function listProjects() {
    jira.listProjects()
        .then(project => {

            for (let instance of project) {
                if (instance.name.match(/iGAMING/gi)) {

                    console.log('index.js>>>58', instance.name + '>>>' + instance.key);
                    searchJira(instance.key);
                }
            }
        })
}


function exportBugs(project, bugArr) {
    var cwd = process.cwd();
    fs.writeFileSync(Path.join(cwd, `./buglist/${project}.json`), JSON.stringify(bugArr));

}

function exportBugsMd(project, strText) {
    var cwd = process.cwd();
    fs.writeFileSync(Path.join(cwd, `./buglist/${project}.md`), strText);
}

function exportBugsHTML(project, htmlStr) {
    var cwd = process.cwd();
    fs.writeFileSync(Path.join(cwd, `./buglist/${project}.html`), htmlStr);
}

function getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = year + seperator1 + month + seperator1 + strDate;
    return currentdate;
}

module.exports = {
    searProjectResolveBug,
    getProject
}