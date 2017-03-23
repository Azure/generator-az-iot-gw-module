(function() {
  'use strict';

  const Gateway = require('azure-iot-gateway');
  const config_path = './gw.config.json';
  const gw = new Gateway(config_path);

  gw.run();
})();
