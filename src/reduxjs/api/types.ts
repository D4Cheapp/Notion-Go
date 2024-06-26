import { Client } from '@notionhq/client';
import { PayloadAction } from '@reduxjs/toolkit';
import { TaskType } from 'src/types';

export type SetClientInfoActionType = PayloadAction<{
  auth_key: string | null;
  database_id: string | null;
}>;
export type GetClientInfoActionType = PayloadAction<Client | null>;
export type SetAllTasksActionType = PayloadAction<TaskType[]>;
export type GetAllTasksActionType = PayloadAction<{
  client: Client | null;
  database_id: string;
  page_size?: number;
}>;
