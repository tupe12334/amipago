import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { swaggerDoc } from './swagger/document';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const documentFactory = () => SwaggerModule.createDocument(app, swaggerDoc);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
