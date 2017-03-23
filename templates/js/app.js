(function() {
  'use strict';

  const Gateway = require('azure-iot-gateway');
  const config_path = './gw.local.config.json';
  const gw = new Gateway(config_path);

  gw.run();
})();
