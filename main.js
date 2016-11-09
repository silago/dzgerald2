const electron = require('electron');
const {app, BrowserWindow, Menu} = require('electron');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the javascript object is GCed.
let mainWindow;

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  if (process.platform != 'darwin')
    app.quit();
});

// This method will be called when Electron has done everything
// initialization and ready for creating browser windows.
app.on('ready', function() {
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 800, height: 600});

  // and load the index.html of the app.
  mainWindow.loadURL('file://' + __dirname + '/views/index.html');
 mainWindow.webContents.openDevTools()

  if (process.platform == 'darwin') {
    const name = app.getName();
  }

  //menu = Menu.buildFromTemplate(application_menu);
  //Menu.setApplicationMenu(menu);

  // Emitted when the window is closed.
  mainWindow.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
});
