import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { CreateTaskDto } from './../src/task/dto/create-task.dto';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/task (POST)', () => {
    const dueDate = new Date();
    return request(app.getHttpServer())
      .post('/task')
      .send({
        title: '01',
        dueDate,
      } as CreateTaskDto)
      .expect(201)
      .expect(function (res) {
        expect(res.body).toEqual(
          expect.objectContaining({
            title: '01',
            dueDate: dueDate.toISOString(),
          }),
        );
      });
  });
});
