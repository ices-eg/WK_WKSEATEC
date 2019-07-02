let Docker = require('dockerode');
let isWindows = process.platform === "win32";

let options = {};

if (isWindows) {
    options = {
        protocol: 'http', host: '127.0.0.1', port: '2376'
    }
} else {
    options = {
        socketPath: '/var/run/docker.sock'
    }
}

module.exports = new Docker(options);