import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    console.time('request time');
    res.on('finish', () => {
      console.timeEnd('request time');
    });
    next();
  }
}
