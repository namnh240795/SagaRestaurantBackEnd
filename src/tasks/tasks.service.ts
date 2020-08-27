import { UpdateTaskDto } from './dtos/update-task.dto';
import { Task } from './interfaces/task.interface';
import { CreateTaskDto } from './dtos/create-task.dto';
import { Injectable } from '@nestjs/common';
import FIREBASE_STORAGE_DB from 'src/firebase';
import { strings } from 'src/strings';

@Injectable()
export class TasksService {
  async create(createTaskDto: CreateTaskDto) {
    const result = await FIREBASE_STORAGE_DB.collection('tasks').add(
      createTaskDto,
    );
    return result.id;
  }

  async search(): Promise<Task[]> {
    const result = await FIREBASE_STORAGE_DB.collection('tasks')
      .limit(10)
      .get();

    return result.docs.map(task => {
      const taskInfo = task.data();
      return { id: task.id, ...taskInfo };
    });
  }

  async updateTask(id: string, updateTaskDto: UpdateTaskDto) {
    const taskRef = FIREBASE_STORAGE_DB.collection('tasks').doc(id);
    const task = await taskRef.get();
    if (!task.exists) {
      return strings.task.notFound;
    }

    await taskRef.update(updateTaskDto);

    return strings.task.updateSuccess;
  }

  async removeTask(id: string) {
    const taskRef = FIREBASE_STORAGE_DB.collection('roles').doc(id);
    const task = await taskRef.get();
    if (!task.exists) {
      return strings.task.notFound;
    }

    await taskRef.delete();
    return strings.task.deleteSuccess;
  }
}
