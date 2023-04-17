import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as passport from 'passport';
import * as session from 'express-session';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  app.use(
    session({
      secret: 'keyboard',
      resave: false,
      saveUninitialized: false,
    }),
  );
  app.use(cookieParser());
  app.use(passport.initialize());
  app.use(passport.session());

  app.useGlobalPipes(new ValidationPipe());

  // swagger
  const config = new DocumentBuilder()
    .setTitle('Appcharge')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3300);
}
bootstrap();
