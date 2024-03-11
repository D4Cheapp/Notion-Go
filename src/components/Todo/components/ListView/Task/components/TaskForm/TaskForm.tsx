import Checkbox from 'expo-checkbox';
import React from 'react';
import { Image, View, Text, Pressable, ScrollView } from 'react-native';
import DateProperty from '../DateProperty';
import { styles } from './TaskFormStyles';
import { Colors } from '@/constants/theme';
import { BlockType } from '@/types';

interface Props {
  dueDate:
    | {
        end: string;
        start: string;
      }
    | undefined;
  taskContent: BlockType[] | undefined;
  isImportant: boolean;
  isUrgent: boolean;
  onTrashClick: () => void;
}

const TaskForm = ({
  dueDate,
  taskContent,
  isImportant,
  isUrgent,
  onTrashClick,
}: Props): React.ReactNode => {
  const isTaskContentExist = taskContent !== undefined && taskContent.length > 0;

  return (
    <>
      <View style={styles.propertyContainer}>
        <Text style={styles.propertyTitle}>Date:</Text>
        <DateProperty dueDate={dueDate} />
      </View>
      <View style={styles.propertyContainer}>
        <Text style={styles.propertyTitle}>Urgent:</Text>
        <Checkbox
          style={styles.checkbox}
          color={isImportant ? Colors.orange : undefined}
          value={isUrgent}
        />
      </View>
      <View style={styles.propertyContainer}>
        <Text style={styles.propertyTitle}>Important:</Text>
        <Checkbox
          style={styles.checkbox}
          color={isImportant ? Colors.orange : undefined}
          value={isImportant}
        />
      </View>
      <View style={styles.propertyContainer}>
        <Text style={styles.propertyTitle}>Delete current task</Text>
        <Pressable onPress={onTrashClick}>
          <Image
            style={styles.trashImage}
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            source={require('../../../../../../../assets/images/trash.png')}
          />
        </Pressable>
      </View>
      {isTaskContentExist && <ScrollView></ScrollView>}
    </>
  );
};

export default TaskForm;
