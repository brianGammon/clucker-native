'use strict'

// Replace the contents of node_modules/rn-host-detect/index.js
// to work around a RB 56 issue:
// https://github.com/zalmoxisus/remote-redux-devtools/issues/117

var NativeModules = require('react-native').NativeModules
/*
 * Get React Native server IP if hostname is `localhost`
 * On Android emulator, the IP of host is `10.0.2.2` (Genymotion: 10.0.3.2)
 */
module.exports = function (hostname) {
  if (
    typeof __fbBatchedBridge !== 'object' ||  // Not on react-native
    hostname !== 'localhost' && hostname !== '127.0.0.1'
  ) {
    return hostname
  }

  var originalWarn = console.warn
  console.warn = function () {
    if (arguments[0] && arguments[0].indexOf('Requiring module \'NativeModules\' by name') > -1) return
    return originalWarn.apply(console, arguments)
  }
  var PlatformConstants
  var AndroidConstants
  if (typeof window === 'undefined' || typeof window.require !== 'function') {
    return hostname
  }

  console.warn = originalWarn
  if (
    !NativeModules ||
    (!NativeModules.PlatformConstants && !NativeModules.AndroidConstants)
  ) {
    return hostname
  }
  PlatformConstants = NativeModules.PlatformConstants

  AndroidConstants = NativeModules.AndroidConstants

  var serverHost = (PlatformConstants ?
    PlatformConstants.ServerHost :
    AndroidConstants.ServerHost
  ) || hostname
  return serverHost.split(':')[0]
}