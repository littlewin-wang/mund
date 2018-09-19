'use strict'

import { app, BrowserWindow, ipcMain } from 'electron'
const chokidar = require('chokidar')
const fs = require('fs')

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
    title: 'Mund',
    width: 1024,
    height: 768,
    frame: true,
    center: true,
    fullscreenable: false,
    resizable: false,
    vibrancy: 'ultra-dark',
    titleBarStyle: 'hidden',
    transparent: true,
    webPreferences: {
      backgroundThrottling: false
    }
  })

  mainWindow.loadURL(winURL)

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.on('ready', createWindow)

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

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */

// add watch handler in main process
ipcMain.on('watch_directory', (event, path) => {
  let watch = chokidar.watch(path)

  // add file change handler
  watch.on('change', (_path) => {
    if (_path === path.concat('/package.json')) {
      fs.stat(_path, (err, stats) => {
        if (err) throw err

        fs.readFile(_path, (err, data) => {
          if (err) throw err

          mainWindow.webContents.send('update_package', {
            path,
            content: data.toString()
          })
        })
      })
    }
  })
})
