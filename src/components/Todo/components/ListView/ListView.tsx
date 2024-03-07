import { Text, Pressable, View } from 'react-native';
import React, { useState } from 'react';
import { TaskType } from 'src/types';
import Task from './Task';
import { styles } from './ListViewStyles';

interface Props {
  tasks: TaskType[];
}

function ListView({ tasks }: Props) {
  const [listView, setListView] = useState<'active' | 'journal'>('active');

  const onActiveListClick = () => {
    setListView('active');
  };

  const onJournalListClick = () => {
    setListView('journal');
  };

  return (
    <>
      <View style={styles.header}>
        <Pressable
          onPress={onActiveListClick}
          style={[listView === 'active' && styles.activeHeaderButton, styles.headerButton]}
        >
          <Text style={styles.buttonText}>Active</Text>
        </Pressable>

        <Pressable
          onPress={onJournalListClick}
          style={[listView === 'journal' && styles.activeHeaderButton, styles.headerButton]}
        >
          <Text style={styles.buttonText}>Journal</Text>
        </Pressable>
      </View>

      <View style={styles.taskContainer}>
        {listView === 'active' && tasks && tasks.map((task) => <Task key={task.id} task={task} />)}
        {listView === 'journal' &&
          tasks &&
          tasks.map((task) => task.properties.Done.checkbox && <Task key={task.id} task={task} />)}
      </View>
    </>
  );
}

export default ListView;
