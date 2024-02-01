import { useEffect, useRef, useState } from 'react';
import { Animated, Easing, View } from 'react-native';
import { Client } from '@notionhq/client';
import { TodoViewType } from 'src/layout';
import { TaskType } from 'src/types';
import ListView from './components/ListView';
import { styles } from './TodoStyles';
import CalendarView from './components/CalendarView';
import { useErrorMessage } from '../../hooks/useErrorMessage';

interface Props {
  client?: Client;
  database_id?: string | null;
  todoView: TodoViewType;
}

function Todo({ client, database_id, todoView }: Props) {
  const [tasks, setTask] = useState<TaskType[]>([]);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const loadingAnimation = useRef(new Animated.Value(0)).current;
  const errorHandler = useErrorMessage();

  const spin = loadingAnimation.interpolate({
    inputRange: [0, 1, 2],
    outputRange: ['0deg', '360deg', '720deg'],
  });

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
      //@ts-ignore
      .then((data) => setTask(data.results))
      .catch((error: Error) => errorHandler(error.message))
      .finally(() => setIsFetching(false));
  };

  const localTaskLoad = () => {
    setIsFetching(false);
  };

  useEffect(() => {
    loadTasks();
  }, [client]);

  useEffect(() => {
    if (isFetching) {
      Animated.loop(
        Animated.timing(loadingAnimation, {
          toValue: 2,
          duration: 3000,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ).start();
    }
  }, [isFetching]);

  return (
    <View style={styles.todoContainer}>
      {isFetching ? (
        <View style={styles.loadingContainer}>
          <Animated.View
            style={{ ...styles.loadingCircle, transform: [{ rotate: spin }] }}
          />
        </View>
      ) : (
        <>
          {todoView === 'calendar' && <CalendarView tasks={tasks} />}
          {todoView === 'list' && <ListView tasks={tasks} />}
        </>
      )}
    </View>
  );
}

export default Todo;
