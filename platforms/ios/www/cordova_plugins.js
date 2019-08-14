cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
  {
    "id": "cordova-plugin-device.device",
    "file": "plugins/cordova-plugin-device/www/device.js",
    "pluginId": "cordova-plugin-device",
    "clobbers": [
      "device"
    ]
  },
  {
    "id": "cordova-plugin-network-information.network",
    "file": "plugins/cordova-plugin-network-information/www/network.js",
    "pluginId": "cordova-plugin-network-information",
    "clobbers": [
      "navigator.connection",
      "navigator.network.connection"
    ]
  },
  {
    "id": "cordova-plugin-network-information.Connection",
    "file": "plugins/cordova-plugin-network-information/www/Connection.js",
    "pluginId": "cordova-plugin-network-information",
    "clobbers": [
      "Connection"
    ]
  },
  {
    "id": "cordova-plugin-splashscreen.SplashScreen",
    "file": "plugins/cordova-plugin-splashscreen/www/splashscreen.js",
    "pluginId": "cordova-plugin-splashscreen",
    "clobbers": [
      "navigator.splashscreen"
    ]
  },
  {
    "id": "phonegap-plugin-mobile-accessibility.mobile-accessibility",
    "file": "plugins/phonegap-plugin-mobile-accessibility/www/mobile-accessibility.js",
    "pluginId": "phonegap-plugin-mobile-accessibility",
    "clobbers": [
      "window.MobileAccessibility"
    ]
  },
  {
    "id": "phonegap-plugin-mobile-accessibility.MobileAccessibilityNotifications",
    "file": "plugins/phonegap-plugin-mobile-accessibility/www/MobileAccessibilityNotifications.js",
    "pluginId": "phonegap-plugin-mobile-accessibility",
    "clobbers": [
      "MobileAccessibilityNotifications"
    ]
  }
];
module.exports.metadata = 
// TOP OF METADATA
{
  "cordova-plugin-device": "2.0.3-dev",
  "cordova-plugin-network-information": "2.0.2-dev",
  "cordova-plugin-splashscreen": "5.0.3-dev",
  "cordova-plugin-whitelist": "1.3.3",
  "phonegap-plugin-mobile-accessibility": "1.0.5-dev"
};
// BOTTOM OF METADATA
});