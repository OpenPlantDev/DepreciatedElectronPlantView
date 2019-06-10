/*---------------------------------------------------------------------------------------------
* Copyright (c) 2019 Bentley Systems, Incorporated. All rights reserved.
* Licensed under the MIT License. See LICENSE.md in the project root for license terms.
*--------------------------------------------------------------------------------------------*/
import * as path from "path";
//import preload from "preload/index";
import { app, protocol, BrowserWindow } from "electron";
import { RpcInterfaceDefinition, ElectronRpcManager } from "@bentley/imodeljs-common";


/**
 * Initializes Electron backend
 */
export default function initialize(rpcs: RpcInterfaceDefinition[]) {
  // tell ElectronRpcManager which RPC interfaces to handle
  ElectronRpcManager.initializeImpl({}, rpcs);
  // in order to preserve the platform standard behavior on MacOS,
  // the application needs to continue running even if the "main" window closes
  // so we'll keep a reference to the currently open "main" window here
  let mainWindow: BrowserWindow | undefined;
  //let embedJQ: BrowserView | undefined;

  /**
   * Converts an "electron://" URL to an absolute file path.
   *
   * We use this protocol in production builds because our frontend must be built with absolute URLs,
   * however, since we're loading everything directly from the install directory, we cannot know the
   * absolute path at build time.
   */
  function parseElectronUrl(requestedUrl: string): string {
    let assetPath = requestedUrl.substr("electron://".length);
    assetPath = assetPath.replace(/#.*$/, "");
    console.log(assetPath);
    // return path.normalize(`${__dirname}/../../webresources/${assetPath}`);
    return "C:/Users/Nick.Wille/PlantView/lib/webresources/index.html";
  }

  /**
   * Creates the "main" electron BrowserWindow with the application's frontend.
   */
  function createWindow() {
    // in dev builds (npm start), we don't copy the public folder to lib/public,
    // so we'll need to access the original public dir for our app icon
    const isDevBuild = (process.env.NODE_ENV === "development");
    console.log("Is dev build: " + isDevBuild);
    const iconPath = (isDevBuild) ? path.join(__dirname, "../../webresources/appicon.ico") : path.join(__dirname, "../../webresources/appicon.ico");

    // configure and create the main window
    mainWindow = new BrowserWindow({
      autoHideMenuBar: true,
      icon: iconPath,
      webPreferences: {
        devTools: true,
        // webSecurity: true,
        //contextIsolation: true,
        //nodeIntegrationInWorker: false,
        //webviewTag: false,
        //preload: path.join("C:/Users/Nick.Wille/PlantView/src/backend/electron/", "preload.js"),
        //enableRemoteModule: false,
        //nativeWindowOpen: false,
        // nodeIntegrationInWorker:
        //allowRunningInsecureContent: true,
        //plugins: true,

        //When node integration is false, can load jQuery well from the web server, npm run electron works as a command, but is failing
        //during the login process, attempting to preload jQuery helps
        preload: "C:/Users/Nick.Wille/PlantView/src/backend/electron/preload.js",
        nodeIntegration: true,
        // nodeIntegrationInWorker: true,
        // allowRunningInsecureContent: true,
      },
    });

    //An attempted method to create a new View, not window, will shares some properties with the parent window its attached to
    //This window can preload jQuery on every single frame the main window loads, this was somewhat successful, still redirects to
    //chrome error page
    // mainWindow.webContents.on("did-start-loading", () => {
    //   if (mainWindow) {
    //     console.log("will navigate notification");
    //     if (mainWindow.webContents.getURL().substring(0, 44) === "https://qa-ims.bentley.com/IMS/Account/Login".substring(0, 44)) {
    //       console.log("Creating a new window to load JQ");
    //       embedJQ = new BrowserView({
    //         // parent: mainWindow,
    //         // modal: false,
    //         // show: true,
    //         webPreferences: {
    //           preload: "C:/Users/Nick.Wille/PlantView/src/backend/electron/preload.js",
    //         },
    //       });
    //       embedJQ.listeners;
    //       mainWindow.on("closed", () => embedJQ = undefined);
    //     }
    //   }
    // });
    mainWindow.on("closed", () => mainWindow = undefined);

    // load the frontend
    //    in development builds, the frontend assets are served by the webpack devserver
    //    in production builds, load the built frontend assets directly from the filesystem
    mainWindow.loadURL(isDevBuild ? "http://localhost:3000" : parseElectronUrl("electron://index.html"));
    //mainWindow.webContents.openDevTools();
    //WIP
    // mainWindow.webContents.on("will-redirect", () => loadjQuery());
  }

  // open the "frontend" window when the application starts up
  app.on("ready", () => {
    createWindow();

    // also handle any "electron://" requests and redirect them to "file://" URLs
    protocol.registerFileProtocol("electron", (request, callback) => callback(parseElectronUrl(request.url)));
  });

  // quit the application when all windows are closed (unless we're running on MacOS)
  app.on("window-all-closed", () => {
    if (process.platform !== "darwin")
      app.quit();
  });

  // re-open the main window if it was closed and the app is re-activated (this is the normal MacOS behavior)
  app.on("activate", () => {
    if (!mainWindow)
      createWindow();
  });
}
