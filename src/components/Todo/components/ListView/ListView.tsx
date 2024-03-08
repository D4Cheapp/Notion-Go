import { Text, Pressable, View } from 'react-native';
import React, { useState } from 'react';
import { TaskType } from 'src/types';
import Task from './Task';
import { styles } from './ListViewStyles';
import { useActions, useAppSelector } from '@/hooks/reduxHooks';
import { clientSelector } from '@/reduxjs/api/selectors';

interface Props {
  tasks: TaskType[];
}

function ListView({ tasks }: Props) {
  const [listView, setListView] = useState<'active' | 'journal'>('active');
  const client = useAppSelector(clientSelector);
  const { setCheckStatus, setTaskCheckStatus, deleteTask } = useActions();
  const isJournal = listView === 'journal';
  const isActive = listView === 'active';

  const onActiveListClick = () => {
    setListView('active');
  };

  const onJournalListClick = () => {
    setListView('journal');
  };

  const onCheckClick = (checked: boolean, index: number, id: string) => {
    if (client) {
      setCheckStatus({ client, task_id: id, checked });
      setTaskCheckStatus({ index, check: checked });
    }
  };

  const onTaskDeleteClick = (index: number, id: string) => {
    if (client) {
      deleteTask({ client, index, task_id: id });
    }
  };

  return (
    <>
      <View style={styles.header}>
        <Pressable
          onPress={onActiveListClick}
          style={[isActive && styles.activeHeaderButton, styles.headerButton]}
        >
          <Text style={[styles.buttonText, isActive && styles.activeHeaderButton]}>Active</Text>
        </Pressable>

        <Pressable
          onPress={onJournalListClick}
          style={[isJournal && styles.activeHeaderButton, styles.headerButton]}
        >
          <Text style={[styles.buttonText, isJournal && styles.activeHeaderButton]}>Journal</Text>
        </Pressable>
      </View>

      <View style={styles.taskContainer}>
        {listView === 'active' &&
          tasks &&
          tasks.map(
            (task, index) =>
              !task.properties.Done.checkbox && (
                <Task key={task.id} task={task} index={index} onCheckClick={onCheckClick} />
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
                  onCheckClick={onCheckClick}
                  onTaskDeleteClick={onTaskDeleteClick}
                />
              ),
          )}
      </View>
    </>
  );
}

export default ListView;
