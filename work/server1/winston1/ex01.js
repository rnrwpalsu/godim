var winston = require('winston');

winston.level = 'debug';

winston.log('debug', 'debug1');
winston.debug('debug2');
// == winston.debug()

winston.info('info1');
winston.warn('warn1');
winston.error('error1');
winston.info('winston.level : ', winston.level);


winston.debug('debug3');