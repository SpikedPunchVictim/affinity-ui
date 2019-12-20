import { app, BrowserWindow, ipcMain, Menu } from 'electron'

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

function createWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 563,
    useContentSize: true,
    width: 1000,
    darkTheme: true
  })

  mainWindow.loadURL(winURL)

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.on('ready', _ => {
  createWindow()
  createMainMenu()
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

function createMainMenu() {
  const template = [
  {
     label: 'Project',
     submenu: [
        {
           label: 'Open...',
           click() {
              dialog.showOpenDialog({
                 title: 'Open Project',
                 properties: ['openDirectory'],
                 defaultPath: AppState.lastProjectPath || ''
              }, dirPath => {
                 if(mainWindow) {
                    mainWindow.webContents.send('project.open', dirPath[0])
                 }
              })
           }
        },
        {
           label: 'Save As...',
           click() {
              // Note:
              //    The showSaveDialog does not support selecting a directory.
              //    A showOpenDialog is used instead
              dialog.showOpenDialog({
                 title: 'Save Project',
                 properties: ['openDirectory', 'createDirectory', 'showHiddenFiles', 'promptToCreate'],
                 buttonLabel: 'Save Project',
                 defaultPath: AppState.lastProjectPath || ''
              }, dirPath => {
                 console.log(`Save As Path: ${dirPath}`)
                 if(mainWindow) {
                    if(Array.isArray(dirPath)) {
                       dirPath = dirPath[0] || ''
                    }
                    fs.mkdirpSync(dirPath)
                    mainWindow.webContents.send('project.save', dirPath)
                 }
              })
           }
        },
        {
           label: "Populate",
           click() {
              mainWindow.webContents.send('project.populate')
           }
        },
        { role: 'undo' },
        { role: 'redo' },
        { type: 'separator' },
        { role: 'cut' },
        { role: 'copy' },
        { role: 'paste' },
        { role: 'delete' },
        { role: 'selectall' }
     ]
  },
  {
     label: 'View',
     submenu: [
        { role: 'reload' },
        { role: 'toggledevtools' },
        { type: 'separator' },
        { role: 'togglefullscreen' }
     ]
  },
  {
     role: 'window',
     submenu: [
        { role: 'minimize' },
        { role: 'close' }
     ]
  },
  {
     role: 'help',
     submenu: [
        {
        label: 'Learn More',
        click () { require('electron').shell.openExternal('http://electron.atom.io') }
        }
     ]
  }
  ]

  if (process.platform === 'darwin') {
  template.unshift({
     label: app.getName(),
     submenu: [
        {
        role: 'about'
        },
        {
        type: 'separator'
        },
        {
        role: 'services',
        submenu: []
        },
        {
        type: 'separator'
        },
        {
        role: 'hide'
        },
        {
        role: 'hideothers'
        },
        {
        role: 'unhide'
        },
        {
        type: 'separator'
        },
        {
        role: 'quit'
        }
     ]
  })
  // Edit menu.
  template[1].submenu.push(
     {
        type: 'separator'
     },
     {
        label: 'Speech',
        submenu: [
        {
           role: 'startspeaking'
        },
        {
           role: 'stopspeaking'
        }
        ]
     }
  )
  // Window menu.
  template[3].submenu = [
     {
        label: 'Close',
        accelerator: 'CmdOrCtrl+W',
        role: 'close'
     },
     {
        label: 'Minimize',
        accelerator: 'CmdOrCtrl+M',
        role: 'minimize'
     },
     {
        label: 'Zoom',
        role: 'zoom'
     },
     {
        type: 'separator'
     },
     {
        label: 'Bring All to Front',
        role: 'front'
     }
    ]
  }

  let menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)
}
