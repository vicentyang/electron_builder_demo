// const {
//   app,
//   dialog,
//   session,
//   BrowserWindow
// } = require('electron');
// // window.electron = require('electron')
// // const {app, BrowserWindow } = require('electron').remote
// const path = require('path');
// // searProjectResolveBug = require('./jira')
// // searProjectResolveBug = searProjectResolveBug
// // Handle creating/removing shortcuts on Windows when installing/uninstalling.
// if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
//   app.quit();
// }

// globalFunc = () => {
//   console.log('globalFunc');
// };

// const createWindow = () => {
//   // Create the browser window.
//   const mainWindow = new BrowserWindow({
//     width: 1920,
//     height: 1080,
//     webPreferences: {
//       //       webSecurity: false, //禁用同源策略
//       nodeIntegration: true,
//       nativeWindowOpen: true,
//       //       plugins: true, //是否支持插件

//       //       nativeWindowOpen: true, //是否使用原生的window.open()

//       //       webviewTag: true, //是否启用 <webview> tag标签
//       enableRemoteModule: true,
//       // preload: path.join(app.getAppPath(), './static/preload.js'),

//       //       sandbox: true,    //沙盒选项,这个很重要
//     }
//   });

//   // and load the index.html of the app.
//   mainWindow.loadFile(path.join(__dirname, 'index.html'));

//   // mainWindow.loadURL('http://edu.makeblock.com').then(() => {

//   // })
//   // mainWindow.loadURL('http://yc.makeblock.com/cache.html')



//   // Open the DevTools.
//   // mainWindow.webContents.openDevTools();
// };

// // This method will be called when Electron has finished
// // initialization and is ready to create browser windows.
// // Some APIs can only be used after this event occurs.
// app.on('ready', createWindow);

// // Quit when all windows are closed, except on macOS. There, it's common
// // for applications and their menu bar to stay active until the user quits
// // explicitly with Cmd + Q.
// app.on('window-all-closed', () => {
//   if (process.platform !== 'darwin') {
//     app.quit();
//   }
// });

// app.on('activate', () => {
//   // On OS X it's common to re-create a window in the app when the
//   // dock icon is clicked and there are no other windows open.
//   if (BrowserWindow.getAllWindows().length === 0) {
//     createWindow();
//   }
// });

// app.setAsDefaultProtocolClient('edu');

// const config = {
//   test: {
//     url: 'http://test-web.makeblock.com/edu/index.html',
//     utoken: 'prfevZ2K',
//   },
//   dev: {
//     url: 'http://dev-web.makeblock.com/edu/index.html',
//     utoken: 'qzqwcgXc',
//   },
//   preview: {
//     url: 'http://pre-web.makeblock.com/edu/index.html',
//     utoken: 'pMBgStQY',
//   },
//   prod: {
//     url: 'https://edu.makeblock.com',
//     utoken: 'MT10uQG3',
//   }
// }


// app.on('open-url', function (event, url) {
//   const env = url.split('?')
//   if (env && env.length > 1) {
//     // document.cookie = `utoken=${config[env][1].utoken};domain=.makeblock.com;`;

//     session.defaultSession.cookies.set(
//       {
//           url:config[env][1].url,
//           name:"utoken",
//           value:config[env][1].url.utoken,
//       }
//     ,(err)=>{console.log('err')})

//     mainWindow.loadURL(config[env][1].url);
//   }
// })

// // electron.session.defaulSession.cookies
// // In this file you can include the rest of your app's specific main process
// // code. You can also put them in separate files and import them here.



const {
  app,
  dialog,
  session,
  BrowserWindow
} = require('electron');
// window.electron = require('electron')
// const {app, BrowserWindow } = require('electron').remote
const path = require('path');
// searProjectResolveBug = require('./jira')
// searProjectResolveBug = searProjectResolveBug
// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit();
}

let openUrl = null

const config = {
  test: {
    url: 'http://test-web.makeblock.com/edu/index.html',
    utoken: 'prfevZ2K',
  },
  dev: {
    url: 'http://dev-web.makeblock.com/edu/index.html',
    utoken: 'qzqwcgXc',
  },
  preview: {
    url: 'http://pre-web.makeblock.com/edu/index.html',
    utoken: 'pMBgStQY',
  },
  prod: {
    url: 'https://edu.makeblock.com',
    utoken: 'MT10uQG3',
  }
}


globalFunc = () => {
  console.log('globalFunc');
};

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1920,
    height: 1080,
    webPreferences: {
      //       webSecurity: false, //禁用同源策略
      nodeIntegration: true,
      nativeWindowOpen: true,
      //       plugins: true, //是否支持插件

      //       nativeWindowOpen: true, //是否使用原生的window.open()

      //       webviewTag: true, //是否启用 <webview> tag标签
      enableRemoteModule: true,
      // preload: path.join(app.getAppPath(), './static/preload.js'),

      //       sandbox: true,    //沙盒选项,这个很重要
    }
  });

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, 'index.html'));

  if (openUrl) {
    const env = openUrl.split('?')
    if (env && env.length > 1) {
      // document.cookie = `utoken=${config[env][1].utoken};domain=.makeblock.com;`;

      console.log(env)
      dialog.showMessageBox(openUrl)
      // mainWindow.loadURL(config[env][1].url).then(() => {
      //   session.defaultSession.cookies.set(
      //     {
      //         url:config[env[1]].url,
      //         name:"utoken",
      //         value:config[env[1]].utoken,
      //     }
      //   ,(err)=>{console.log('err')})
      // });
    }
  }

  // mainWindow.loadURL('http://edu.makeblock.com').then(() => {

  // })
  mainWindow.loadURL('http://vicent.makeblock.com:8000')
  session.defaultSession.loadExtension('/Users/vicent/Library/Application Support/Google/Chrome/Default/Extensions/lmhkpmbekcpmknklioeibfkpmmfibljd/2.17.0_0')



  // Open the DevTools.
  // mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

app.setAsDefaultProtocolClient('edu');



app.on('open-url', function (event, url) {
  openUrl = url
})

// electron.session.defaulSession.cookies
// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.