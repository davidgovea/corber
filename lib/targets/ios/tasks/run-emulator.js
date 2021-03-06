const Task            = require('../../../tasks/-task');
const spawn           = require('../../../utils/spawn');
const Promise         = require('rsvp').Promise;

module.exports = Task.extend({
  run(emulator, appName, builtPath) {
    let boot = [
      '/usr/bin/xcrun',
      ['simctl', 'boot', emulator.id]
    ];

    let open = [
      'open',
      ['/Applications/Xcode.app/Contents/Developer/Applications/Simulator.app']
    ];

    let install = [
      '/usr/bin/xcrun',
      ['simctl', 'install', emulator.id, builtPath]
    ];

    let launch = [
      '/usr/bin/xcrun',
      ['simctl', 'launch', emulator.id, appName]
    ];

    let bootEm;
    if (emulator.state !== 'Booted') {
      bootEm = spawn.apply(null, boot);
    } else {
      bootEm = Promise.resolve();
    }

    return bootEm
      .then(() => spawn.apply(null, open))
      .then(() => spawn.apply(null, install))
      .then(() => spawn.apply(null, launch))
  }
});
