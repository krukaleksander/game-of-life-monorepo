import { Test, TestingModule } from '@nestjs/testing';
import {INestApplication, ValidationPipe} from '@nestjs/common';
import * as request from "supertest";
import { AppModule } from '../src/app/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  it('/api (GET) response status 200', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
  });
  it('/api/game (POST) response status 400 with no board passed', () => {
    return request(app.getHttpServer())
      .post('/game')
      .send({})
      .expect(400);
  });
});
