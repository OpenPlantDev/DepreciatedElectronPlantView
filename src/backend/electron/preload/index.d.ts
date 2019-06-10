// /*~ This declaration specifies that the function
//  *~ is the exported object from the file
//  */
// import preloader = require("C:/Users/Nick.Wille/PlantView/src/backend/electron/preload");
// export = preloader;

// /*~ This example shows how to have multiple overloads for your function */
// declare function preloadJQ(): void;

// /*~ If you want to expose types from your module as well, you can
//  *~ place them in this block. Often you will want to describe the
//  *~ shape of the return type of the function; that type should
//  *~ be declared in here, as this example shows.
//  *~
//  *~ Note that if you decide to include this namespace, the module can be
//  *~ incorrectly imported as a namespace object, unless
//  *~ --esModuleInterop is turned on:
//  *~   import * as x from '[~THE MODULE~]'; // WRONG! DO NOT DO THIS!
//  */
// /* declare namespace MyFunction {
//     export interface LengthReturnType {
//         width: number;
//         height: number;
//     }
//     export interface NamedReturnType {
//         firstName: string;
//         lastName: string;
//     }

//     ~ If the module also has properties, declare them here. For example,
//      *~ this declaration says that this code is legal:
//      *~   import f = require('myFuncLibrary');
//      *~   console.log(f.defaultName);

//     export const defaultName: string;
//     export let defaultLength: number;
// } */
