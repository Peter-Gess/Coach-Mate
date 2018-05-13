// Modules
const {BrowserWindow} = require('electron')

// BrowserWindow
let bigItemWin

// New read item method
module.exports = (url, callback ) => {

  // Create new offscreen BrowserWindow
    bigItemWin = new BrowserWindow({
        width: 1000,
        height: 1000,
        show: false,
        webPreferences: {
            offscreen: true
        }
    })

    //Load read item
    bigItemWin.loadURL(url)

    //Wait for page to finish loading
    bigItemWin.webContents.on('did-finish-load', () => {

    // Get screenshot thumbnail
    bigItemWin.webContents.capturePage((image) => {

        // Get image as dataURL
        let screenshot = image.toDataURL()

        // Get page title
        let title = bigItemWin.getTitle()

        //Return new item via callback
        callback({title, screenshot, url})

        // Clean up
        bigItemWin.close()
        bigItemWin = null
      })
    })
}
