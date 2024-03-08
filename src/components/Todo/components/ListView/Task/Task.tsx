import React, { useState } from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import { TaskType } from 'src/types';
import Checkbox from 'expo-checkbox';
import { styles } from './TaskStyles';
import Property from './Property';
import { Colors } from '@/constants/theme';

interface Props {
  task: TaskType;
  index: number;
  onCheckClick: (checked: boolean, index: number, id: string) => void;
  onTaskDeleteClick?: (index: number, id: string) => void;
}

function Task({ task, index, onCheckClick, onTaskDeleteClick }: Props): React.ReactNode {
  const title = task.properties.Name.title[0].plain_text;
  const urgency = task.properties.Urgency;
  const importance = task.properties.Importance;
  const isPriorityExist = urgency.select !== null || importance.select !== null;
  const [isChecked, setIsChecked] = useState(task.properties.Done.checkbox);

  const onCheckboxChange = (checked: boolean) => {
    setIsChecked(checked);
    onCheckClick(checked, index, task.id);
  };

  const onTrashClick = () => {
    if (onTaskDeleteClick) {
      onTaskDeleteClick(index, task.id);
    }
  };

  return (
    <View style={styles.task}>
      <Checkbox
        style={styles.checkbox}
        color={isChecked ? Colors.orange : undefined}
        onValueChange={onCheckboxChange}
        value={isChecked}
      />
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{title}</Text>
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
      {isChecked && (
        <View>
          <Pressable onPress={onTrashClick}>
            <Image
              style={styles.trashImage}
              // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
              source={require('../../../../../assets/images/trash.png')}
            />
          </Pressable>
        </View>
      )}
    </View>
  );
}

export default Task;
