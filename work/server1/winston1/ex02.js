var winston = require('winston');

var logger = new winston.Logger({
    level: 'info',
    transports: [
        new(winston.transports.Console)(),
        new(winston.transports.File)({ filename: 'my log' })
    ]
});

logger.info('log info test1');