import React, { useState } from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import { BlockType, TaskType } from 'src/types';
import Checkbox from 'expo-checkbox';
import Property from './components/Property';
import TaskForm from './components/TaskForm';
import DateProperty from './components/DateProperty';
import { styles } from './TaskStyles';
import { Colors } from '@/constants/theme';
import ModalWindow from '@/components/ModalWindow';

interface Props {
  task: TaskType;
  index: number;
  taskContent: BlockType[] | undefined;
  onCheckClick: (checked: boolean, index: number, id: string) => void;
  onTaskClick: (id: string) => void;
  onTaskDeleteClick?: (index: number, id: string) => void;
}

const Task = ({
  task,
  taskContent,
  index,
  onCheckClick,
  onTaskClick,
  onTaskDeleteClick,
}: Props): React.ReactNode => {
  const [isChecked, setIsChecked] = useState(task.properties.Done.checkbox);
  const [isContentShown, setIsContentShown] = useState(false);
  const title = task.properties.Name.title[0].plain_text;
  const icon = task.icon;
  const iconUri =
    icon !== null
      ? icon.type === 'external'
        ? icon.external.url
        : icon.type !== 'emoji'
          ? icon.file.url
          : ''
      : '';
  const urgency = task.properties.Urgency;
  const importance = task.properties.Importance;
  const dueDate = task.properties.Date?.date;
  const isImportant = importance.select !== null;
  const isUrgent = urgency.select !== null;
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

  const handleTaskPress = () => {
    setIsContentShown(true);
    onTaskClick(task.id);
  };

  const handleContentClose = () => {
    setIsContentShown(false);
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
        <Pressable onPress={handleTaskPress} style={styles.titleContainer}>
          <Text style={styles.title}>
            {icon !== null &&
              (icon.type === 'emoji' ? (
                icon.emoji + ' '
              ) : (
                <>
                  <Image style={styles.icon} source={{ uri: iconUri }} />
                  <Text> </Text>
                </>
              ))}
            {title}
          </Text>
          {isDateExist && (
            <View style={styles.dateContainer}>
              <Image
                style={styles.calendar}
                source={
                  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                  require('../../../../../assets/images/calendar.png')
                }
              />
              <DateProperty dueDate={dueDate} />
            </View>
          )}
          {isPriorityExist && (
            <View style={styles.priorityContainer}>
              {isUrgent && (
                //@ts-ignore
                <Property text={urgency.select.name} color={urgency.select.color} />
              )}
              {isImportant && (
                //@ts-ignore
                <Property text={importance.select.name} color={importance.select.color} />
              )}
            </View>
          )}
        </Pressable>
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
      <ModalWindow
        closeAction={handleContentClose}
        isWindowActive={isContentShown}
        title={title}
        icon={icon}
      >
        <TaskForm
          dueDate={dueDate}
          taskContent={taskContent}
          isImportant={isImportant}
          isUrgent={isUrgent}
          onTrashClick={handleTrashClick}
        />
      </ModalWindow>
      <View style={styles.divider} />
    </>
  );
};

export default Task;
