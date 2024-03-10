import React, { useState } from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import { TaskType } from 'src/types';
import Checkbox from 'expo-checkbox';
import { styles } from './TaskStyles';
import Property from './Property';
import { Colors } from '@/constants/theme';

const dateFormatter = (date: string): string => {
  let resultDateString = date[5] + date[6] + '/' + date[8] + date[9];
  if (date.includes('T')) {
    resultDateString += ' ' + date[11] + date[12] + ':' + date[14] + date[15];
  }
  return resultDateString;
};

interface Props {
  task: TaskType;
  index: number;
  onCheckClick: (checked: boolean, index: number, id: string) => void;
  onTaskDeleteClick?: (index: number, id: string) => void;
}

const Task = ({ task, index, onCheckClick, onTaskDeleteClick }: Props): React.ReactNode => {
  const [isChecked, setIsChecked] = useState(task.properties.Done.checkbox);
  const title = task.properties.Name.title[0].plain_text;
  const urgency = task.properties.Urgency;
  const importance = task.properties.Importance;
  const dueDate = task.properties.Date?.date;
  const isPriorityExist = urgency.select !== null || importance.select !== null;
  const isDateExist = dueDate !== null;

  const handleCheckboxChange = (checked: boolean) => {
    setIsChecked(checked);
    onCheckClick(checked, index, task.id);
  };

  const handleTrashClick = () => {
    if (onTaskDeleteClick) {
      onTaskDeleteClick(index, task.id);
    }
  };

  return (
    <>
      <View style={styles.task}>
        <Checkbox
          style={styles.checkbox}
          color={isChecked ? Colors.orange : undefined}
          onValueChange={handleCheckboxChange}
          value={isChecked}
        />
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{title}</Text>
          {isDateExist && (
            <View style={styles.dateContainer}>
              <Image
                style={styles.calendar}
                source={
                  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                  require('../../../../../assets/images/calendar.png')
                }
              />
              {dueDate?.start && <Text style={styles.date}>{dateFormatter(dueDate.start)}</Text>}
              {dueDate?.end && dueDate?.start && <Text style={styles.date}>{' / '}</Text>}
              {dueDate?.end && <Text style={styles.date}>{dateFormatter(dueDate.end)}</Text>}
            </View>
          )}
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
            <Pressable onPress={handleTrashClick}>
              <Image
                style={styles.trashImage}
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                source={require('../../../../../assets/images/trash.png')}
              />
            </Pressable>
          </View>
        )}
      </View>
      <View style={styles.divider} />
    </>
  );
};

export default Task;
