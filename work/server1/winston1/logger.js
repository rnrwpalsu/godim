var winston = require('winston');
var moment = require('moment');

var daily_opts = {
    level: 'debug',
    filename: 'app-debug',
    maxsize: 10 * 1024 * 1024,
    datePattern: '.yyy-MM-dd.log',
    timestamp: function() { return moment().format('YYYY-MM-DD HH:mm:ss.SSS'); }
};
// app-debug.2017-08-03.log

var options = {
    level: 'info',
    transports: [
        new(winston.transports.Console)({ level: 'verbose', colorize: 'all' }),
        new(winston.transports.File)({ filename: 'error.log', level: 'error' }),
        new(require('winston-daily-rotate-file'))(daily_opts)

    ]
};

var logger = new winston.Logger(options);

module.exports = logger;