import React from 'react';
import { Text, View } from 'react-native';
import { TaskType } from 'src/types';
import Checkbox from 'expo-checkbox';
import { styles } from './TaskStyles';
import Property from './Property';

interface Props {
  task: TaskType;
}

function Task({ task }: Props): React.ReactNode {
  const title = task.properties.Name.title[0].plain_text;
  const urgency = task.properties.Urgency;
  const importance = task.properties.Importance;
  const isPriorityExist = urgency.select !== null || importance.select !== null;

  return (
    <View style={styles.root}>
      <View style={styles.task}>
        <Checkbox value={task.properties.Done.checkbox} />
        <Text style={styles.title}>{title}</Text>
      </View>
      {isPriorityExist && (
        <View style={styles.priorityContainer}>
          {urgency.select !== null && (
            <Property text={urgency.select.name} color={urgency.select.color} />
          )}
          {importance.select !== null && (
            <Property text={importance.select.name} color={importance.select.color} />
          )}
        </View>
      )}
    </View>
  );
}

export default Task;
