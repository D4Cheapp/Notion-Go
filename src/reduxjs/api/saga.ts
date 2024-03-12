import { all, call, put, takeEvery } from 'redux-saga/effects';
import { Client } from '@notionhq/client';
import { NotionToMarkdown } from 'notion-to-md';
import { BlockType, TaskType } from 'src/types';
import { apiActions } from './index';
import { baseActions } from '../base';
import {
  DeleteTaskActionType,
  GetAllTasksActionType,
  GetTaskContentActionType,
  SetCheckStatusActionType,
  SetClientInfoActionType,
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
        sorts: [
          {
            property: 'Date',
            direction: 'ascending',
          },
          {
            property: 'Importance',
            direction: 'ascending',
          },
          {
            property: 'Urgency',
            direction: 'ascending',
          },
          {
            property: 'Created time',
            direction: 'ascending',
          },
        ],
      })
      .then((data) => data.results)
      .catch((error) => {
        throw error;
      });
    yield put(apiActions.setAllTasks(tasks));
  } catch (error: unknown) {
    const errors = error as Error;
    yield put(baseActions.setError(errors.message));
  }
  yield put(baseActions.setIsTasksLoading(false));
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
    const mdBlocks: BlockType[] = yield call(() => n2m.pageToMarkdown(task_id));
    yield put(apiActions.setTaskContent(mdBlocks));
  }
  yield put(baseActions.setIsTaskContentLoading(false));
}

function* setCheckStatusSaga(action: SetCheckStatusActionType) {
  const { client, task_id, checked } = action.payload;
  try {
    yield client.pages.update({ page_id: task_id, properties: { Done: { checkbox: checked } } });
  } catch (error: unknown) {
    const errors = error as Error;
    yield put(baseActions.setError(errors.message));
  }
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
    takeEvery(apiActions.getTaskContent, getTaskContentSaga),
    takeEvery(apiActions.deleteTask, deleteTaskSaga),
    takeEvery(apiActions.setCheckStatus, setCheckStatusSaga),
    takeEvery(apiActions.getClientInfo, getClientInfoSaga),
  ]);
}
