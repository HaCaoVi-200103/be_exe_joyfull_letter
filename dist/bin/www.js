"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const api_1 = __importDefault(require("../api"));
const debug_1 = __importDefault(require("debug"));
const http_1 = __importDefault(require("http"));
require("dotenv/config");
const debug = (0, debug_1.default)('myapp:server');
const normalizePort = (val) => {
    const port = parseInt(val, 10);
    if (isNaN(port)) {
        return val;
    }
    if (port >= 0) {
        return port;
    }
    return false;
};
const onError = (error) => {
    if (error.syscall !== 'listen') {
        throw error;
    }
    const bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
};
const onListening = () => {
    const addr = server.address();
    if (addr === null) {
        debug('Unable to determine server address.');
        return;
    }
    else {
        const bind = typeof addr === 'string'
            ? 'pipe ' + addr
            : 'port ' + addr.port;
        debug('Listening on ' + bind);
    }
};
const hostName = process.env.HOST_NAME || 'localhost';
const port = normalizePort(process.env.PORT || "8000");
api_1.default.set('port', port);
const server = http_1.default.createServer(api_1.default);
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
console.log(`Example app listening on http://${hostName}:${port}/api/v1`);
