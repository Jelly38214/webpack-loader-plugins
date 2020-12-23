const log4js = require('log4js');

/**
 * 对日志进行分类管理
 * appenders: 定义输出方式以及输出地点
 * categories:定义输出规则,调用appenders进行输出
 */
log4js.configure({
  appenders: {
    fileLog: {
      type: 'file',
      filename: 'cheese.log',
      maxLogSize: 1024 * 1024 * 10, //  超过10M进行日志滚动
    },
    terminalLog: {
      type: 'stdout',
    },
  },
  categories: {
    default: {
      appenders: ['fileLog', 'terminalLog'],
      level: 'debug',
    },
    terminal: {
      appenders: ['terminalLog'],
      level: 'warn',
    },
  },
});

/**
 * getLogger接收的参数如果在categories里找不到 ，则使用default
 */
const logger = log4js.getLogger();

/**
 * level is OFF by default
 * To enable logs, must set the level
 */

logger.trace('This is a TRACE msg');
logger.debug('This is a DEBUG msg');
logger.info('This is a INFO msg');
logger.warn('This is a WARN msg');
logger.error('This is a ERROR msg');
logger.fatal('This is FATAL msg ');
