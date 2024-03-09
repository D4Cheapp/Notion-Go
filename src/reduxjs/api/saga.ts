import { all, call, put, takeEvery } from 'redux-saga/effects';
import { Client } from '@notionhq/client';
import { apiActions } from './index';
import { baseActions } from '../base';
import {
  DeleteTaskActionType,
  GetAllTasksActionType,
  SetCheckStatusActionType,
  SetClientInfoActionType,
} from './types';

function* getAllTasksSaga(action: GetAllTasksActionType) {
  yield put(baseActions.setIsLoading(true));
  const { client, database_id, page_size } = action.payload;
  try {
    //@ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const tasks = yield client?.databases
      .query({
        database_id,
        page_size: page_size ? page_size : 100,
        sorts: [
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
      //@ts-ignore
      .then((data) => data.results)
      .catch((error) => {
        throw error;
      });
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    yield put(apiActions.setAllTasks(tasks));
  } catch (error: unknown) {
    const errors = error as Error;
    yield put(baseActions.setError(errors.message));
  }
  yield put(baseActions.setIsLoading(false));
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
  yield put(baseActions.setIsLoading(true));
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
  yield put(baseActions.setIsLoading(false));
}

export function* apiSaga() {
  yield all([
    takeEvery(apiActions.getAllTasks, getAllTasksSaga),
    takeEvery(apiActions.deleteTask, deleteTaskSaga),
    takeEvery(apiActions.setCheckStatus, setCheckStatusSaga),
    takeEvery(apiActions.getClientInfo, getClientInfoSaga),
  ]);
}
