import React from 'react';
import { View } from 'react-native';
import { isTasksLoadingSelector, taskViewSelector } from 'src/reduxjs/base/selectors';
import { tasksSelector } from 'src/reduxjs/api/selectors';
import LoadingCircle from '../LoadingCircle';
import ListView from './components/ListView';
import CalendarView from './components/CalendarView';
import { useAppSelector } from '@/hooks/reduxHooks';

const Todo = (): React.ReactNode => {
  const taskView = useAppSelector(taskViewSelector);
  const tasks = useAppSelector(tasksSelector);
  const isTasksLoading = useAppSelector(isTasksLoadingSelector);

  return (
    <View style={{ flex: 1 }}>
      {isTasksLoading ? (
        <LoadingCircle trigger={isTasksLoading} size={100}/>
      ) : (
        <>
          {taskView === 'calendar' && <CalendarView tasks={tasks} />}
          {taskView === 'list' && <ListView tasks={tasks} />}
        </>
      )}
    </View>
  );
};

export default Todo;
