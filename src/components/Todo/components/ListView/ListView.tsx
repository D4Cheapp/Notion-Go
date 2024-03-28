import { Text, Pressable, View, ScrollView, RefreshControl } from 'react-native';
import React, { useState } from 'react';
import { TaskType } from 'src/types';
import { useActions, useAppSelector } from '@/hooks/reduxHooks';
import { Colors } from '@/constants/theme';
import { clientSelector, databaseIdSelector, taskContentSelector } from '@/reduxjs/api/selectors';
import Task from './Task';
import { styles } from './ListViewStyles';

interface Props {
  tasks: TaskType[];
  completedTasks: string[];
}

const ListView = ({ tasks, completedTasks }: Props): React.ReactNode => {
  const [listView, setListView] = useState<'active' | 'journal'>('active');
  const [refreshing, setRefreshing] = useState(false);
  const client = useAppSelector(clientSelector);
  const database_id = useAppSelector(databaseIdSelector);
  const taskContent = useAppSelector(taskContentSelector);
  const { getAllTasks, getTaskContent, setTaskCompleteStatus, deleteTask } = useActions();
  const isJournal = listView === 'journal';
  const isActive = listView === 'active';

  const handleActiveListClick = () => {
    setListView('active');
  };

  const handleJournalListClick = () => {
    setListView('journal');
  };

  const handleCheckClick = (checked: boolean, task_id: string) => {
    setTaskCompleteStatus({ task_id, checked: checked });
  };

  const handleTaskDeleteClick = (index: number, id: string) => {
    if (client) {
      deleteTask({ client, index, task_id: id });
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    const isReadyToFetch = client && database_id;
    if (isReadyToFetch) {
      setRefreshing(false);
      getAllTasks({ client, database_id });
    } else {
      setRefreshing(false);
    }
  };

  const handleTaskClick = (id: string) => {
    getTaskContent({ client, task_id: id });
  };

  return (
    <>
      <View style={styles.header}>
        <Pressable
          onPress={handleActiveListClick}
          style={[isActive && styles.activeHeaderButton, styles.headerButton]}
        >
          <Text style={[styles.buttonText, isActive && styles.activeHeaderButton]}>Active</Text>
        </Pressable>
        <Pressable
          onPress={handleJournalListClick}
          style={[isJournal && styles.activeHeaderButton, styles.headerButton]}
        >
          <Text style={[styles.buttonText, isJournal && styles.activeHeaderButton]}>Journal</Text>
        </Pressable>
      </View>
      <ScrollView
        contentContainerStyle={styles.taskContainer}
        refreshControl={
          <RefreshControl
            progressBackgroundColor={Colors.fg}
            colors={[Colors.orange]}
            refreshing={refreshing}
            onRefresh={handleRefresh}
          />
        }
      >
        {listView === 'active' &&
          tasks &&
          tasks.map(
            (task, index) =>
              !completedTasks.includes(task.id) && (
                <Task
                  key={task.id}
                  task={task}
                  isCompleted={false}
                  index={index}
                  taskContent={taskContent}
                  onTaskClick={handleTaskClick}
                  onCheckClick={handleCheckClick}
                />
              ),
          )}
        {listView === 'journal' &&
          tasks &&
          tasks.map(
            (task, index) =>
              completedTasks.includes(task.id) && (
                <Task
                  key={task.id}
                  task={task}
                  isCompleted
                  index={index}
                  taskContent={taskContent}
                  onCheckClick={handleCheckClick}
                  onTaskClick={handleTaskClick}
                  onTaskDeleteClick={handleTaskDeleteClick}
                />
              ),
          )}
      </ScrollView>
    </>
  );
};

export default ListView;
