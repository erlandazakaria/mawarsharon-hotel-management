/* eslint global-require: off */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `yarn build` or `yarn build-main`, this file is compiled to
 * `./app/main.prod.js` using webpack. This gives us some performance wins.
 *
 * @flow
 */
import { app, BrowserWindow, ipcMain } from 'electron';
import { autoUpdater } from 'electron-updater';
import log from 'electron-log';
import MenuBuilder from './menu';
import Connection from './containers/Connection';
const path = require("path");
var pdf = require("pdf-creator-node");
var fs = require('fs');

export default class AppUpdater {
  constructor() {
    log.transports.file.level = 'info';
    autoUpdater.logger = log;
    autoUpdater.checkForUpdatesAndNotify();
  }
}

let mainWindow = null;

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

if (
  process.env.NODE_ENV === 'development' ||
  process.env.DEBUG_PROD === 'true'
) {
  require('electron-debug')();
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS', 'REDUX_DEVTOOLS'];

  return Promise.all(
    extensions.map(name => installer.default(installer[name], forceDownload))
  ).catch(console.log);
};

/**
 * Add event listeners...
 */

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('ready', async () => {
  if (
    process.env.NODE_ENV === 'development' ||
    process.env.DEBUG_PROD === 'true'
  ) {
    await installExtensions();
  }

  mainWindow = new BrowserWindow({
    show: false,
    width: 1024,
    height: 728,
    frame: false
  });

  mainWindow.loadURL(`file://${__dirname}/app.html`);

  // @TODO: Use 'ready-to-show' event
  //        https://github.com/electron/electron/blob/master/docs/api/browser-window.md#using-ready-to-show-event
  mainWindow.webContents.on('did-finish-load', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.maximize();
    } else {
      mainWindow.maximize();
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  // Remove this if your app does not use auto updates
  // eslint-disable-next-line
  new AppUpdater();
});

ipcMain.on('select-all-message', (event, arg) => {
  let sql = `SELECT * FROM ${arg}`;

  let selectAllPromise = new Promise(function(resolve, reject){
    Connection.query(sql, 
    function (error, rows, fields){
      if(error){
        console.log(error)
        reject(error)
      } else {
        resolve({table: arg, rows: rows});
      }
    });
  })
  selectAllPromise.then((rows) => {
    event.sender.send('select-all-reply', rows)
  })
});

ipcMain.on('edit-booking', (event, arg) => {
  let sql = "UPDATE bookings SET room_price=?, booking_nik=?, booking_name=?, booking_address=?, booking_phone=?, booking_checkin=?, booking_checkout=?, booking_addons=?, booking_total=? WHERE id_book=?";
  let selectAllPromise = new Promise(function(resolve, reject){
    Connection.query(sql, [arg.room_price, arg.booking_nik, arg.booking_name, arg.booking_address, arg.booking_phone, arg.booking_checkin, arg.booking_checkout, arg.booking_addons, arg.booking_total, arg.id_book], 
    function (error, result){
      if(error){
        console.log(error)
        reject(error)
      } else {
        resolve(result);
      }
    });
  })
  selectAllPromise.then((result) => {
    event.sender.send('edit-booking-reply', result)
  })
});

ipcMain.on('insert-booking', (event, arg) => {
  let sql = "INSERT INTO bookings SET ?"
  let sqlFields = {
    booking_room: arg.booking_room,
    room_price: arg.room_price, 
    booking_nik: arg.booking_nik, 
    booking_name: arg.booking_name, 
    booking_address: arg.booking_address, 
    booking_phone: arg.booking_phone, 
    booking_checkin: arg.booking_checkin, 
    booking_checkout: arg.booking_checkout, 
    booking_addons: arg.booking_addons, 
    booking_total: arg.booking_total
  }
  let selectAllPromise = new Promise(function(resolve, reject){
    Connection.query(sql, sqlFields, 
    function (error, result, fields){
      if(error){
        console.log(error)
        reject(error)
      } else {
        resolve(result);
      }
    });
  })
  selectAllPromise.then((result) => {
    event.sender.send('insert-booking-reply', result)
  })
});

ipcMain.on('delete-booking', (event, arg) => {
  let sql = "DELETE FROM bookings WHERE id_book=?";
  let selectAllPromise = new Promise(function(resolve, reject){
    Connection.query(sql, [arg], 
    function (error, result){
      if(error){
        console.log(error)
        reject(error)
      } else {
        resolve(result);
      }
    });
  })
  selectAllPromise.then((result) => {
    event.sender.send('delete-booking-reply', result)
  })
});

ipcMain.on('generate-pdf', (event, arg) => {
  var html = fs.readFileSync(path.resolve(__dirname, "./pdf-template/template.html"), 'utf8');
  var options = {
    format: "A4",
    orientation: "portrait",
    border: "10mm"
  };
  // var bookings = [
  //   {
  //       name:"Shyam",
  //       age:"26"
  //   },
  //   {
  //       name:"Navjot",
  //       age:"26"
  //   },
  //   {
  //       name:"Vitthal",
  //       age:"26"
  //   }
  // ]
  var document = {
      html: html,
      data: {
          bookings: arg
      },
      path: "./output.pdf"
  };
  pdf.create(document, options)
    .then(res => {
        console.log(res)
    })
    .catch(error => {
        console.error(error)
    });
});

