/*These methods are the ones I found to have the most support and be the most promising, but I haven't gotten any of them to work */
//Method #1, preloading a function to inject jquery manually into any browser window loaded, this function gets exported as a preload
  // const preloadJQ = () => {
  //   const path = require('path')
  //   window.addEventListener('load', () => {
  //     //inject jquery to page
  //     window.$ = window.jQuery = require(path.join(__dirname, "../../../node_modules/jquery/dist/jquery.js"));
  //   });
  // };
  //  module.exports = preloadJQ;
//Method #2 manually adjusting global window variables type
  //window.nodeRequire = require;
  //window.$ = window.JQuery = require("C:/Users/Nick.Wille/PlantView/node_modules/jquery/dist/jquery");
  // //delete window.require;
  // //delete window.exports;
  // //delete window.module;
//Method #3 Injecting a script into a window instead of an event listener based function, a lot of different ways to do this
//#3 approach 1
/* <script>if (typeof module === 'object') {window.module = module; module = undefined;}</script>
<script src="scripts/jquery.min.js"></script>
<script src="scripts/vendor.js"></script>
<script>if (window.module) module = window.module;</script> */
