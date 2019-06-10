/*---------------------------------------------------------------------------------------------
* Copyright (c) 2019 Bentley Systems, Incorporated. All rights reserved.
* Licensed under the MIT License. See LICENSE.md in the project root for license terms.
*--------------------------------------------------------------------------------------------*/
import {
  BentleyCloudRpcManager, BentleyCloudRpcParams,
  ElectronRpcManager, ElectronRpcConfiguration,
  RpcConfiguration, MobileRpcConfiguration, MobileRpcManager,
} from "@bentley/imodeljs-common";
import getSupportedRpcs from "../../common/rpcs";

/**
 * Initializes RPC communication based on the platform
 */
export default function initRpc(rpcParams?: BentleyCloudRpcParams): RpcConfiguration {
  let config: RpcConfiguration;
  console.log("In rpc.ts initRPC");
  const rpcInterfaces = getSupportedRpcs();
  console.log("rpcInterfaces : " + rpcInterfaces);
  console.log("***************isElectron " + ElectronRpcConfiguration.isElectron);
  /* For debugging only const variable not for production build*/
  //const variable = true;
  if (ElectronRpcConfiguration.isElectron) {
    // initializes RPC for Electron
    console.log("In RPC initialization for electron");
    config = ElectronRpcManager.initializeClient({}, rpcInterfaces);
  } else if (MobileRpcConfiguration.isMobileFrontend) {
    console.log("In RPC initialization for mobile");
    config = MobileRpcManager.initializeClient(rpcInterfaces);
  } else {
    console.log("In RPC initialization for web");
    // initialize RPC for web apps
    console.log("rpcParams: " + rpcParams);
    if (!rpcParams)
      rpcParams = { info: { title: "simple-viewer-app", version: "v1.0" }, uriPrefix: "http://localhost:3001" };
    config = BentleyCloudRpcManager.initializeClient(rpcParams, rpcInterfaces);
  }
  console.log("*This is the config returned from frontend/api/rpc.ts");
  console.log(config);
  return config;
}
