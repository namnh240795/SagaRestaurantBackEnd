import { AssignTasksDto } from './dtos/assign-tasks.dto';
import { CreateTasksDto } from './dtos/create-tasks.dto';
import { UpdateTaskDto } from './dtos/update-task.dto';
// import { Task } from './interfaces/task.interface';
import { CreateTaskDto } from './dtos/create-task.dto';
import { Injectable } from '@nestjs/common';
import FIREBASE_STORAGE_DB from 'src/firebase';
import { strings } from 'src/strings';
import { FilterAssignedDto } from './dtos/filter-assigned.dto';
import dayjs from 'dayjs';

@Injectable()
export class TasksService {
  async create(createTaskDto: CreateTaskDto) {
    const result = await FIREBASE_STORAGE_DB.collection('tasks').add(
      createTaskDto,
    );
    return result.id;
  }

  async getUnAssignedTask() {
    const result = await FIREBASE_STORAGE_DB.collection('tasks')
      .where('idUser', '==', null)
      .get();

    return {
      total: result.docs.length,
    };
  }

  async getByIdUser(query: FilterAssignedDto, user: any) {
    const snapShot = FIREBASE_STORAGE_DB.collection('tasks');

    let result;
    if (!query.nextPage) {
      result = await snapShot
        .where('idUser', '==', user.id)
        .limit(10)
        .get();
    } else {
      const startAfterSnapshot = await FIREBASE_STORAGE_DB.collection('tasks')
        .doc(query.nextPage)
        .get();

      result = await snapShot
        .where('idUser', '==', user.id)
        .startAfter(startAfterSnapshot)
        .limit(10)
        .get();
    }

    if (result.docs.length <= 0) {
      return { data: { list: [], nextPage: null } };
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

  async assignTasks(assignTasksDto: AssignTasksDto) {
    const batch = FIREBASE_STORAGE_DB.batch();

    const noneMatchingUserIdTasks = await FIREBASE_STORAGE_DB.collection(
      'tasks',
    )
      .where('idUser', '==', null)
      .limit(assignTasksDto.numberOfTask)
      .get();

    if (noneMatchingUserIdTasks.docs.length < assignTasksDto.numberOfTask) {
      return { message: strings.task.notEnoughTaskToAssign };
    }

    noneMatchingUserIdTasks.docs.map(task => {
      const taskId = task.id;
      const newTaskRef = FIREBASE_STORAGE_DB.collection('tasks').doc(taskId);
      batch.update(newTaskRef, { idUser: assignTasksDto.idUser });
    });

    await batch.commit();

    return { data: strings.task.assignSuccess };
  }

  async batch(createTasksDto: CreateTasksDto) {
    if (createTasksDto.tasks && createTasksDto.tasks.length > 500) {
      return { message: strings.task.tooManyItem };
    }

    const writeBatch = FIREBASE_STORAGE_DB.batch();

    createTasksDto.tasks.forEach(task =>
      FIREBASE_STORAGE_DB.collection('tasks').add({
        ...task,
        idUser: null,
        idOrder: null,
        updateAt: dayjs(new Date()).unix(),
        createdAt: dayjs(new Date()).unix(),
        tags: [],
      }),
    );

    await writeBatch.commit();

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
      return { message: strings.task.notFound };
    }

    await taskRef.update({
      ...updateTaskDto,
      updateAt: dayjs(new Date()).unix(),
    });

    return { data: strings.task.updateSuccess };
  }

  async removeTask(id: string) {
    const taskRef = FIREBASE_STORAGE_DB.collection('tasks').doc(id);
    const task = await taskRef.get();
    if (!task.exists) {
      return strings.task.notFound;
    }

    await taskRef.delete();
    return strings.task.deleteSuccess;
  }
}
