const NodeEnvironment = require('jest-environment-node');
const { join, normalize } = require('path');
const { platform } = require('os');

class Env extends NodeEnvironment {
  constructor(config) {
    super(Object.assign({}, config, {
      globals: Object.assign({}, config.globals, {
        Uint8Array: Uint8Array,
        ArrayBuffer: ArrayBuffer,
        Java: process.env.JAVA_HOME ? join(process.env.JAVA_HOME, 'bin', platform() === 'win32' ? 'java.exe' : 'java') : undefined,
        root: normalize(join(__dirname, "..", "temp")),
      })
    }))
  }
}

module.exports = Env;