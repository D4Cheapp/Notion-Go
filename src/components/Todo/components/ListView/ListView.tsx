import { Text, Pressable, View, ScrollView, RefreshControl } from 'react-native';
import React, { useState } from 'react';
import { TaskType } from 'src/types';
import Task from './Task';
import { styles } from './ListViewStyles';
import { useActions, useAppSelector } from '@/hooks/reduxHooks';
import { clientSelector, databaseIdSelector, taskContentSelector } from '@/reduxjs/api/selectors';

interface Props {
  tasks: TaskType[];
}

const ListView = ({ tasks }: Props): React.ReactNode => {
  const [listView, setListView] = useState<'active' | 'journal'>('active');
  const [refreshing, setRefreshing] = useState(false);
  const client = useAppSelector(clientSelector);
  const database_id = useAppSelector(databaseIdSelector);
  const taskContent = useAppSelector(taskContentSelector);
  const { getAllTasks, getTaskContent, setCheckStatus, setTaskCheckStatus, deleteTask } =
    useActions();
  const isJournal = listView === 'journal';
  const isActive = listView === 'active';

  const handleActiveListClick = () => {
    setListView('active');
  };

  const handleJournalListClick = () => {
    setListView('journal');
  };

  const handleCheckClick = (checked: boolean, index: number, id: string) => {
    if (client) {
      setCheckStatus({ client, task_id: id, checked });
      setTaskCheckStatus({ index, check: checked });
    }
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
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
      >
        {listView === 'active' &&
          tasks &&
          tasks.map(
            (task, index) =>
              !task.properties.Done.checkbox && (
                <Task
                  key={task.id}
                  task={task}
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
              task.properties.Done.checkbox && (
                <Task
                  key={task.id}
                  task={task}
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
