'use strict';

module.exports = {
    api: {
        port: 8001,
    },
    static: {
        port: 8000,
        path: './static',
    },
    db: {
        host: '127.0.0.1',
        port: 5432,
        database: 'example',
        user: 'postgres',
        password: 'deded',
    },
    sandbox: {
        timeout: 5000,
        displayErrors: false,
    },
};