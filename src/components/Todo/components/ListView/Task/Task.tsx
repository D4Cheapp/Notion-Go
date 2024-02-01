import React from 'react';
import { Text, View } from 'react-native';
import { TaskType } from 'src/types';
import Checkbox from 'expo-checkbox';
import { styles } from './TaskStyles';

interface Props {
  task: TaskType;
}

function Task({ task }: Props): React.ReactNode {
  const title = task.properties.Name.title[0].plain_text;

  return (
    <View style={styles.root}>
      <Checkbox value={task.properties.Checkbox.checkbox} />
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

export default Task;
