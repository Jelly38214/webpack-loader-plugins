const pino = require('pino');
const logger = pino(
  {
    name: 'Server',
    crlf: true,
    prettyPrint: {
      colorize: true,
      translateTime: 'yyyy-mm-dd HH:MM:ss.l',
      ignore: 'pid,hostname',
    },
  },
  pino.destination()
);

logger.info(JSON.stringify({ name: 'Jelly' }, null, 2));
