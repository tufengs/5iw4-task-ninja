import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}

  create(createTaskDto: CreateTaskDto) {
    return this.prisma.task.create({
      data: createTaskDto,
    });
  }

  findAll() {
    return this.prisma.task.findMany();
  }

  findOne(id: number) {
    return this.prisma.task.findUnique({
      where: { id },
    });
  }

  async update(id: number, data: CreateTaskDto) {
    const task = await this.findOne(id);

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    try {
      return this.prisma.task.update({
        where: { id },
        data,
      });
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async remove(id: number) {
    const task = await this.findOne(id);

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    try {
      return this.prisma.task.delete({
        where: { id },
      });
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
