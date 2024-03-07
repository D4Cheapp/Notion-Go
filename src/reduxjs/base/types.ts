import { PayloadAction } from "@reduxjs/toolkit";

export type ErrorMessageType = { message: string; id: number };
export type SetErrorActionType = PayloadAction<string>;
export type CloseErrorActionType = PayloadAction<number>;
export type SetTaskViewActionType = PayloadAction<"calendar" | "list">;
export type SetIsLoadingActionType = PayloadAction<boolean>;
