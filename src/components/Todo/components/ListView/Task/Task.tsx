import React, { useRef, useState } from 'react';
import { Animated, Easing, Image, Pressable, Text, View } from 'react-native';
import { TaskContentBlockType, TaskPropertyType, TaskType, TitlePropertyType } from 'src/types';
import Checkbox from 'expo-checkbox';
import { useActions } from '@/hooks/reduxHooks';
import { Colors } from '@/constants/theme';
import ModalWindow from '@/components/ModalWindow';
import TaskForm from './components/TaskForm';
import TaskProperty from './components/TaskProperty';
import { styles } from './TaskStyles';

interface Props {
  task: TaskType;
  isCompleted: boolean;
  index: number;
  taskContent: TaskContentBlockType[] | null | undefined;
  onCheckClick: (checked: boolean, id: string) => void;
  onTaskClick: (id: string) => void;
  onTaskDeleteClick?: (index: number, id: string) => void;
}

const Task = ({
  task,
  isCompleted,
  taskContent,
  index,
  onCheckClick,
  onTaskClick,
  onTaskDeleteClick,
}: Props): React.ReactNode => {
  const [isChecked, setIsChecked] = useState(isCompleted);
  const [isContentShown, setIsContentShown] = useState(false);
  const taskAnimationRef = useRef(new Animated.Value(0)).current;
  const { setTaskContent } = useActions();
  const properties = Object.entries(task.properties) as unknown as [string, TaskPropertyType][];
  const isPropertyExists = properties.length > 1;
  const icon = task.icon;
  const iconUri =
    icon !== null
      ? icon.type === 'external'
        ? icon.external.url
        : icon.type !== 'emoji'
          ? icon.file.url
          : ''
      : '';

  let title: string | null = (
    properties.filter(
      (property: [string, TaskPropertyType]) => property[1].id === 'title',
    )[0][1] as TitlePropertyType
  ).title[0].plain_text;
  if (title === null) {
    title = 'Untitled';
  } else {
    title = title.trim();
  }

  const translateAnimation = taskAnimationRef.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 5],
  });

  const handleCheckboxChange = (checked: boolean) => {
    setIsChecked(checked);
    Animated.timing(taskAnimationRef, {
      toValue: 100,
      duration: 500,
      easing: Easing.bounce,
      useNativeDriver: true,
    }).start();
    setTimeout(() => {
      onCheckClick(checked, task.id);
    }, 500);
  };

  const handleTrashClick = () => {
    if (onTaskDeleteClick) {
      Animated.timing(taskAnimationRef, {
        toValue: 100,
        duration: 500,
        easing: Easing.bounce,
        useNativeDriver: true,
      }).start();
      setTimeout(() => {
        onTaskDeleteClick(index, task.id);
      }, 500);
    }
  };

  const handleTaskPress = () => {
    setIsContentShown(true);
    onTaskClick(task.id);
  };

  const handleContentClose = () => {
    setIsContentShown(false);
    setTaskContent(null);
  };

  return (
    <>
      <Animated.View
        style={{
          ...styles.task,
          transform: [{ translateX: translateAnimation }],
        }}
      >
        {isChecked && (
          <View>
            <Pressable onPress={handleTrashClick}>
              <Image
                style={styles.trashImage}
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                source={require('../../../../../assets/images/darkTheme/globalIcons/trash.webp')}
              />
            </Pressable>
          </View>
        )}
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
          {isPropertyExists && (
            <View>
              {properties.map(([, prop]) => (
                <TaskProperty key={prop.id} property={prop} />
              ))}
            </View>
          )}
        </Pressable>
        <Checkbox
          style={styles.checkbox}
          color={isChecked ? Colors.orange : undefined}
          onValueChange={handleCheckboxChange}
          value={isChecked}
        />
      </Animated.View>
      <ModalWindow
        closeAction={handleContentClose}
        isWindowActive={isContentShown}
        title={title}
        icon={icon}
      >
        <TaskForm
          taskProperties={properties}
          taskContent={taskContent}
          onTrashClick={handleTrashClick}
        />
      </ModalWindow>
      <View style={styles.divider} />
    </>
  );
};

export default Task;
