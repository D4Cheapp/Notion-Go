import { useEffect, useState } from 'react';
import { Button, View } from 'react-native';
import { Client } from '@notionhq/client';
import {
  DatabaseObjectResponse,
  PageObjectResponse,
  PartialDatabaseObjectResponse,
  PartialPageObjectResponse,
} from '@notionhq/client/build/src/api-endpoints';
import { TodoViewType } from 'src/layout';
import ListView from './components/ListView';
import CalendarView from './components/CalendarView';
import { useErrorMessage } from '../../hooks/useErrorMessage';

interface Props {
  client?: Client;
  database_id?: string | null;
  todoView: TodoViewType;
}

type TasksType = (
  | PageObjectResponse
  | PartialPageObjectResponse
  | PartialDatabaseObjectResponse
  | DatabaseObjectResponse
)[];

function Todo({ client, database_id, todoView }: Props) {
  const [tasks, setTask] = useState<TasksType>([]);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const errorHandler = useErrorMessage();

  const loadTasks = () => {
    const isReadyToServerFetch = client && typeof database_id === 'string';
    setIsFetching(true);

    if (isReadyToServerFetch) {
      void serverTaskLoad();
    } else {
      void localTaskLoad();
    }
  };

  const serverTaskLoad = async () => {
    await client?.databases
      .query({
        //@ts-ignore
        database_id,
        page_size: 100,
      })
      .then((data) => setTask(data.results))
      .catch((error: Error) => errorHandler(error.message))
      .finally(() => setIsFetching(false));
  };

  const localTaskLoad = () => {
    setIsFetching(false);
  };

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <View>
      {todoView === 'calendar' && <CalendarView />}
      {todoView === 'list' && <ListView />}

      <Button title="Загрузить задачи" onPress={loadTasks} />
    </View>
  );
}

export default Todo;
