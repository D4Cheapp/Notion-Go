import React from 'react';
import { View } from 'react-native';
import { isTasksLoadingSelector, taskViewSelector } from 'src/reduxjs/base/selectors';
import { completedTasksSelector, tasksSelector } from 'src/reduxjs/api/selectors';
import { useAppSelector } from '@/hooks/reduxHooks';
import LoadingCircle from '../LoadingCircle';
import ListView from './components/ListView';
import CalendarView from './components/CalendarView';

const Todo = (): React.ReactNode => {
  const taskView = useAppSelector(taskViewSelector);
  const tasks = useAppSelector(tasksSelector);
  const completedTasks = useAppSelector(completedTasksSelector);
  const isTasksLoading = useAppSelector(isTasksLoadingSelector);

  return (
    <View style={{ flex: 1 }}>
      {isTasksLoading ? (
        <LoadingCircle trigger={isTasksLoading} size={100} />
      ) : (
        <>
          {taskView === 'calendar' && (
            <CalendarView tasks={tasks} completedTasks={completedTasks} />
          )}
          {taskView === 'list' && <ListView tasks={tasks} completedTasks={completedTasks} />}
        </>
      )}
    </View>
  );
};

export default Todo;
