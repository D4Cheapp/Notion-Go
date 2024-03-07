import { all } from "redux-saga/effects";
import { apiSaga } from "./api/saga";

export function* rootSaga() {
  yield all([apiSaga()]);
}
