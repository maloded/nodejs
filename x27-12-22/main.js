'use strict';

const fsp = require('node:fs').promises;
const path = require('node:path');
const server = require('./ws.js');
const staticServer = require('./static.js');
const hash = require('./hash.js');
const load = require('./load.js');
const logger = require('./logger.js');
const config = require('./config.js');
const load = require('./load.js')(config.sandbox);
const db = require('./db.js')(config.db);

const sandbox = {
    console: Object.freeze(logger),
    db: Object.freeze(db),
    common: { hash }
}

const apiPath = path.join(process.cwd(), './api');
const routing = {};

(async () => {
    const files = await fsp.readdir(apiPath);
    for (const fileName of files) {
        if (!fileName.endsWith('.js')) continue;
        const filePath = path.join(apiPath, fileName);
        const serviceName = path.basename(fileName, '.js');
        routing[serviceName] = await load(filePath, sandbox);
    }   

    staticServer(config.static.path, config.static.port);
    server(routing, config.static.apiPath);
})();