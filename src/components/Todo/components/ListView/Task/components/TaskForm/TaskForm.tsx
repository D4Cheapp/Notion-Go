import Checkbox from 'expo-checkbox';
import React from 'react';
import { Image, View, Text, Pressable, ScrollView } from 'react-native';
import DateProperty from '../DateProperty';
import { styles } from './TaskFormStyles';
import { Colors } from '@/constants/theme';
import { BlockType } from '@/types';
import { useAppSelector } from '@/hooks/reduxHooks';
import { isTaskContentLoadingSelector } from '@/reduxjs/base/selectors';
import LoadingCircle from '@/components/LoadingCircle';

interface Props {
  dueDate:
    | {
        end: string;
        start: string;
      }
    | undefined
    | null;
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
  const isContentLoading = useAppSelector(isTaskContentLoadingSelector);
  const isTaskContentExist = taskContent !== undefined && taskContent.length > 0;

  return (
    <>
      {dueDate && (
        <View style={styles.propertyContainer}>
          <Text style={styles.propertyTitle}>Date:</Text>
          <DateProperty dueDate={dueDate} />
        </View>
      )}
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
      <ScrollView style={styles.contentContainer}>
        {isContentLoading ? (
          <LoadingCircle trigger={isContentLoading} size={50}/>
        ) : (
          <>
            {isTaskContentExist && (
              <>
                {taskContent.map((block) => {
                  switch (block.type) {
                    case 'paragraph':
                      return (
                        <Text key={block.blockId} style={styles.paragraph}>
                          {block.parent}
                        </Text>
                      );

                    case 'heading_1':
                    case 'heading_2':
                    case 'heading_3':
                      const isToggle = block.children.length > 0;
                      const headerType = block.type;

                      if (isToggle) {
                        return (
                          <View key={block.blockId}>
                            <Text
                              style={
                                headerType === 'heading_1'
                                  ? styles.headerOne
                                  : headerType === 'heading_2'
                                    ? styles.headerTwo
                                    : styles.headerThree
                              }
                            >
                              {block.parent.slice(2, block.parent.length)}
                            </Text>
                            {block.children.map((child) => (
                              <Text key={child.blockId} style={styles.paragraph}>
                                • {child.parent}
                              </Text>
                            ))}
                          </View>
                        );
                      } else {
                        return (
                          <Text
                            key={block.blockId}
                            style={
                              headerType === 'heading_1'
                                ? styles.headerOne
                                : headerType === 'heading_2'
                                  ? styles.headerTwo
                                  : styles.headerThree
                            }
                          >
                            {block.parent.slice(
                              parseInt(headerType[headerType.length - 1]) + 1,
                              block.parent.length,
                            )}
                          </Text>
                        );
                      }

                    case 'bulleted_list_item':
                      return <Text key={block.blockId}></Text>;

                    case 'callout':
                      return <Text key={block.blockId}></Text>;

                    case 'column_list':
                      return <Text key={block.blockId}></Text>;

                    case 'divider':
                      return <Text key={block.blockId}></Text>;

                    case 'image':
                      return <Text key={block.blockId}></Text>;

                    case 'numbered_list_item':
                      return <Text key={block.blockId}></Text>;

                    case 'quote':
                      return <Text key={block.blockId}></Text>;

                    case 'table':
                      return <Text key={block.blockId}></Text>;

                    case 'to_do':
                      return <Text key={block.blockId}></Text>;

                    case 'toggle':
                      return <Text key={block.blockId}></Text>;
                  }
                })}
              </>
            )}
          </>
        )}
      </ScrollView>
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
    </>
  );
};

export default TaskForm;
