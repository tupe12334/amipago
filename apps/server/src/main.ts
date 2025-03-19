import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { writeFile } from 'fs/promises';
import { join } from 'path';
import { AppModule } from './app.module';
import { swaggerDoc } from './swagger/document';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const document = SwaggerModule.createDocument(app, swaggerDoc);

  // Save swagger json next to main.ts
  await writeFile(
    join(__dirname, '../swagger.json'),
    JSON.stringify(document, null, 2),
  );

  SwaggerModule.setup('api', app, () => document, {
    jsonDocumentUrl: '/api-json',
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
