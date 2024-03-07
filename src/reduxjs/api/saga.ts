import { all, call, put, takeEvery } from 'redux-saga/effects';
import { Client } from '@notionhq/client';
import { apiActions } from './index';
import { baseActions } from '../base';
import { GetAllTasksActionType, SetClientInfoActionType } from './types';

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
    takeEvery(apiActions.getClientInfo, getClientInfoSaga),
    takeEvery(apiActions.getAllTasks, getAllTasksSaga),
  ]);
}
