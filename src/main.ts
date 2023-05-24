import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { VersioningType } from '@nestjs/common';
import * as session from 'express-session';
import * as passport from 'passport';
import * as connectMongoDBSession from 'connect-mongodb-session';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

const MongoDBStore = connectMongoDBSession(session);

const sessionsStore = new MongoDBStore({
  uri: process.env.MONGODB_URI,
  collection: 'sessions',
});

async function bootstrap() {
  const PORT = process.env.PORT ? parseInt(process.env.PORT) : 5001;
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  app.use(
    session({
      secret: process.env.COOKIE_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
      },
      store: sessionsStore,
    }),
  );

  //should be call before SwaggerModule setup
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  const config = new DocumentBuilder()
    .setTitle('Simple school management')
    .setDescription('School management RESTful API')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.use(passport.initialize());
  app.use(passport.session());

  await app.listen(PORT, () => {
    console.log(`server is listening at PORT: ${PORT}`);
  });
}
bootstrap();
