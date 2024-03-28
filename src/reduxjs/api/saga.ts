import { all, call, put, takeEvery } from 'redux-saga/effects';
import { Client } from '@notionhq/client';
import { NotionToMarkdown } from 'notion-to-md';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TaskContentBlockType, TaskType } from 'src/types';
import { apiActions } from './index';
import { baseActions } from '../base';
import {
  DeleteTaskActionType,
  GetAllTasksActionType,
  GetSortedTasksActionType,
  GetTaskContentActionType,
  SetClientInfoActionType,
  SetTaskCompleteStatusActionType,
} from './types';

function* getAllTasksSaga(action: GetAllTasksActionType) {
  yield put(baseActions.setIsTasksLoading(true));
  const { client, database_id, page_size } = action.payload;
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const tasks: TaskType[] = yield client?.databases
      .query({
        database_id,
        page_size: page_size ? page_size : 100,
      })
      .then((data) => data.results)
      .catch((error) => {
        throw error;
      });

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    let completedTasks: string[] | null = yield AsyncStorage.getItem('completedTasks')
      .then((data) => {
        if (data !== null) {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-return
          return JSON.parse(data);
        } else {
          return null;
        }
      })
      .catch((error) => {
        throw error;
      });

    const isCompletedTaskExist = completedTasks !== null && completedTasks.length > 0;
    if (isCompletedTaskExist) {
      const tasksId = tasks.map((task) => task.id);
      //@ts-ignore
      completedTasks = completedTasks.filter((id) => tasksId.includes(id));
      yield AsyncStorage.setItem('completedTasks', JSON.stringify(completedTasks));
    }
    yield put(apiActions.setAllTasks({ tasks, completedTasks }));
  } catch (error: unknown) {
    const errors = error as Error;
    yield put(baseActions.setError(errors.message));
  }
  yield put(baseActions.setIsTasksLoading(false));
}

function* getSortedTasksSaga(action: GetSortedTasksActionType) {
  yield put(baseActions.setIsTasksLoading(false));
  const { client, database_id, sorts, page_size } = action.payload;
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const tasks: TaskType[] = yield client?.databases
      .query({
        database_id,
        page_size: page_size ? page_size : 100,
        sorts,
      })
      .then((data) => data.results)
      .catch((error) => {
        throw error;
      });
    yield put(apiActions.setAllTasks({ tasks }));
  } catch (error: unknown) {
    const errors = error as Error;
    yield put(baseActions.setError(errors.message));
  }
  yield put(baseActions.setIsTasksLoading(false));
}

function* setTaskCompleteStatusSaga(action: SetTaskCompleteStatusActionType) {
  const { task_id, checked } = action.payload;
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const completedTasks: string[] | null = yield AsyncStorage.getItem('completedTasks')
      .then((data) => {
        if (data !== null) {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-return
          return JSON.parse(data);
        } else {
          return null;
        }
      })
      .catch((error) => {
        throw error;
      });
    const isCompletedTaskExist = completedTasks !== null && completedTasks.length > 0;
    if (checked) {
      if (isCompletedTaskExist) {
        completedTasks.push(task_id);
        yield AsyncStorage.setItem('completedTasks', JSON.stringify(completedTasks));
      } else {
        yield AsyncStorage.setItem('completedTasks', JSON.stringify([task_id]));
      }
    } else {
      if (isCompletedTaskExist) {
        completedTasks.filter((id) => id !== task_id);
        yield AsyncStorage.setItem('completedTasks', JSON.stringify(completedTasks));
      }
    }
  } catch (error: unknown) {
    const errors = error as Error;
    yield put(baseActions.setError(errors.message));
  }
}

function* deleteTaskSaga(action: DeleteTaskActionType) {
  const { client, task_id } = action.payload;
  try {
    yield client.pages.update({ page_id: task_id, archived: true });
  } catch (error: unknown) {
    const errors = error as Error;
    yield put(baseActions.setError(errors.message));
  }
}

function* getTaskContentSaga(action: GetTaskContentActionType) {
  yield put(baseActions.setIsTaskContentLoading(true));
  const { client, task_id } = action.payload;
  if (client) {
    const n2m = new NotionToMarkdown({ notionClient: client });
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const mdBlocks: TaskContentBlockType[] = yield call(() => n2m.pageToMarkdown(task_id));
    yield put(apiActions.setTaskContent(mdBlocks));
  }
  yield put(baseActions.setIsTaskContentLoading(false));
}

function* getClientInfoSaga(action: SetClientInfoActionType) {
  yield put(baseActions.setIsTasksLoading(true));
  const { auth_key, database_id } = action.payload;
  const isClientCanFetch = auth_key && database_id;
  if (isClientCanFetch) {
    const client = new Client({
      auth: auth_key,
    });
    yield put(apiActions.setClientInfo(client));
    yield call(() =>
      getAllTasksSaga({ payload: { client, database_id }, type: 'baseSlice/getAllTasks' }),
    );
  } else {
    yield put(apiActions.setClientInfo(null));
  }
  yield put(baseActions.setIsTasksLoading(false));
}

export function* apiSaga() {
  yield all([
    takeEvery(apiActions.getAllTasks, getAllTasksSaga),
    takeEvery(apiActions.getSortedTasks, getSortedTasksSaga),
    takeEvery(apiActions.getTaskContent, getTaskContentSaga),
    takeEvery(apiActions.setTaskCompleteStatus, setTaskCompleteStatusSaga),
    takeEvery(apiActions.deleteTask, deleteTaskSaga),
    takeEvery(apiActions.getClientInfo, getClientInfoSaga),
  ]);
}
