'use strict';

const assert = require('assert');
const path = require('path');
const logger = require('../dist/logger').Logger.getInstance();
const config = require('../dist/config').Config;

describe('logger', () => {
    it('error', () => {
        logger.error('error');
    });
    it('warn', () => {
        logger.warn('warn');
    });
    it('info', () => {
        logger.info('info');
    });
    it('verbose', () => {
        logger.verbose('verbose');
    });
    it('debug', () => {
        logger.debug('debug');
    });
    it('silly', () => {
        logger.silly('silly');
    });
});

describe('config', () => {
    describe('load config', () => {
        it('load config', () => {
            const cf = config.get(path.join(__dirname,
                'config'),
                `${process.env.NODE_ENV || "development"}`,
                "default",
            );
            console.log(cf.server);
        });
    })
    describe('exceptions', () => {
        it('invalid directory parameter', () => {
            assert.throws(() => {
                config.get();
            }, new Error('invalid directory parameter'));
        });
        it('invalid name array parameter', () => {
            assert.throws(() => {
                config.get(__dirname);
            }, new Error('invalid name array parameter'));
        });
        it('invalid directory', () => {
            assert.throws(() => {
                config.get(path.join(__dirname, 'out'), 'local');
            }, new Error('invalid directory'));
        });
        it('configuration not found', () => {
            assert.throws(() => {
                config.get(path.join(__dirname, 'config'), 'local');
            }, new Error('configuration not found'));
        });
    });
});
