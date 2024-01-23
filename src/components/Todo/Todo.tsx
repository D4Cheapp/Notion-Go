import { useEffect, useState } from 'react';
import { Button, View } from 'react-native';
import { Client } from '@notionhq/client';
import {
  DatabaseObjectResponse,
  PageObjectResponse,
  PartialDatabaseObjectResponse,
  PartialPageObjectResponse,
} from '@notionhq/client/build/src/api-endpoints';
import { useErrorBoundary } from 'react-error-boundary';
import { todoViewType } from 'src/layout';
import { CalendarView, ListView } from './components';

interface TodoCalendarInterface {
  client?: Client;
  database_id?: string | null;
  todoView: todoViewType;
}

type tasksType = (
  | PageObjectResponse
  | PartialPageObjectResponse
  | PartialDatabaseObjectResponse
  | DatabaseObjectResponse
)[];

function Todo({ client, database_id, todoView }: TodoCalendarInterface) {
  const [tasks, setTask] = useState<tasksType>([]);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const { showBoundary } = useErrorBoundary();

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
        database_id: '12qeq2eq223',
        page_size: 100,
      })
      .then((data) => setTask(data.results))
      .catch((error) => showBoundary(error))
      .finally(() => setIsFetching(false));
  };

  const localTaskLoad = () => {
    setIsFetching(false);
  };

  useEffect(() => {
    // loadTasks();
    void serverTaskLoad();
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
