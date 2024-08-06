import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './common/filters/http-exception/http-exception.filter';
import { WrapResponseInterceptor } from './common/interceptors/wrap-response/wrap-response.interceptor';
import { TimeoutInterceptor } from './common/interceptors/timeout/timeout.interceptor';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  /** 验证前端传来的参数是否符合验证规则 */
  app.useGlobalPipes(
    new ValidationPipe({
      // whitelist: true,
      forbidNonWhitelisted: true,
      // transform: true,
      transformOptions: {
        // 隐式类型转换
        enableImplicitConversion: true,
      },
    }),
  );
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(
    new WrapResponseInterceptor(),
    new TimeoutInterceptor(),
  );
  const options = new DocumentBuilder()
    .setTitle('IluvCoffee')
    .setDescription('IluvCoffee API description')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app as any, options);
  SwaggerModule.setup('api', app as any, document);
  await app.listen(3000);
}
bootstrap();
