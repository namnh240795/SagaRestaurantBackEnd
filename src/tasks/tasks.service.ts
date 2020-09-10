import { CreateTasksDto } from './dtos/create-tasks.dto';
import { UpdateTaskDto } from './dtos/update-task.dto';
// import { Task } from './interfaces/task.interface';
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

  async batch(createTasksDto: CreateTasksDto) {
    if (createTasksDto.tasks && createTasksDto.tasks.length > 500) {
      return { message: strings.task.tooManyItem };
    }
    const batch = FIREBASE_STORAGE_DB.batch();

    createTasksDto.tasks.forEach(task =>
      FIREBASE_STORAGE_DB.collection('tasks').add(task),
    );

    await batch.commit();

    return { data: strings.task.batchSuccess };
  }

  async search(nextPage: string): Promise<any> {
    const snapShot = FIREBASE_STORAGE_DB.collection('tasks');
    let result;
    if (!nextPage) {
      result = await snapShot.limit(10).get();
    } else {
      const startAfterSnapshot = await FIREBASE_STORAGE_DB.collection('tasks')
        .doc(nextPage)
        .get();

      result = await snapShot
        .startAfter(startAfterSnapshot)
        .limit(10)
        .get();
    }

    return {
      data: {
        list: result.docs.map(task => {
          const taskInfo = task.data();
          return { id: task.id, ...taskInfo };
        }),
        nextPage: result.docs[result.docs.length - 1].id,
      },
    };
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
