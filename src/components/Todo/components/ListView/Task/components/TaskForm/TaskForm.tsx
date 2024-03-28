import React from 'react';
import { Image, View, Text, Pressable, ScrollView } from 'react-native';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { useAppSelector } from '@/hooks/reduxHooks';
import { isTaskContentLoadingSelector } from '@/reduxjs/base/selectors';
import LoadingCircle from '@/components/LoadingCircle';
import { TaskContentBlockType, TaskPropertyType } from '@/types';
import TaskProperty from '../TaskProperty';
import CheckboxBlock from './CheckboxBlock';
import TitleBlock from './TitleBlock';
import { styles } from './TaskFormStyles';

interface Props {
  taskProperties: [string, TaskPropertyType][];
  taskContent: TaskContentBlockType[] | null | undefined;
  onTrashClick: () => void;
}

const TaskForm = ({ taskProperties, taskContent, onTrashClick }: Props): React.ReactNode => {
  const isContentLoading = useAppSelector(isTaskContentLoadingSelector);
  const isTaskContentExist = taskContent && taskContent.length > 0;

  return (
    <ScrollView>
      <View>
        {taskProperties.map((property) => (
          <TaskProperty key={property[1].id} property={property[1]} propertyName={property[0]} />
        ))}
      </View>
      {(isContentLoading || isTaskContentExist) && (
        <View style={styles.contentContainer}>
          {isContentLoading ? (
            <LoadingCircle trigger={isContentLoading} size={50} />
          ) : (
            <>
              {isTaskContentExist && (
                <>
                  {taskContent.map((block) => {
                    const blockSwitch = (block: TaskContentBlockType): React.ReactNode => {
                      switch (block.type) {
                        case 'heading_1':
                        case 'heading_2':
                        case 'heading_3':
                        case 'paragraph':
                        case 'toggle':
                          return <TitleBlock key={block.blockId} block={block} />;

                        case 'bulleted_list_item':
                          return (
                            <Text key={block.blockId} style={styles.paragraph}>
                              {'●  '}
                              {block.parent.slice(2, block.parent.length)}
                            </Text>
                          );

                        case 'numbered_list_item':
                          return (
                            <Text key={block.blockId} style={styles.paragraph}>
                              {block.parent}
                            </Text>
                          );

                        case 'to_do':
                          return <CheckboxBlock key={block.blockId} block={block} />;

                        case 'divider':
                          return <View key={block.blockId} style={styles.divider} />;

                        case 'quote':
                          return (
                            <Text key={block.blockId} style={styles.quote}>
                              {block.parent.slice(2, block.parent.length)}
                            </Text>
                          );

                        case 'callout':
                          return (
                            <Text key={block.blockId} style={styles.callout}>
                              {block.parent.slice(1, block.parent.length)}
                            </Text>
                          );

                        case 'column_list':
                          return (
                            <View key={block.blockId}>
                              {block.children.map((column) => (
                                <View key={column.blockId} style={styles.column}>
                                  {/* @ts-ignore */}
                                  {column.children.map((childrenBlock: TaskContentBlockType) =>
                                    blockSwitch(childrenBlock),
                                  )}
                                </View>
                              ))}
                            </View>
                          );

                        case 'table':
                          let cells = block.parent
                            .split('|')
                            .filter((cell) => cell[0] !== ',' && cell !== '' && cell !== '\n');
                          let columns = 0;
                          for (const cell of cells) {
                            if (cell.includes('-')) {
                              break;
                            } else {
                              columns++;
                            }
                          }
                          cells = cells.filter((cell) => !cell.includes('-'));

                          const grid: string[][] = [];
                          let columnsAccumulator = 0;
                          let rowAccumulator: string[] = [];
                          for (let index = 0; index < cells.length; index++) {
                            if (columnsAccumulator < columns) {
                              columnsAccumulator++;
                              rowAccumulator.push(cells[index]);
                            }
                            if (index === cells.length - 1 || columnsAccumulator >= columns) {
                              grid.push(rowAccumulator);
                              rowAccumulator = [];
                              columnsAccumulator = 0;
                            }
                          }

                          return (
                            <Grid key={block.blockId} style={styles.table}>
                              {grid.map((row, index) => (
                                <Row key={block.children[index].blockId} style={styles.tableRow}>
                                  {row.map((column, index) => (
                                    <Col key={index} style={styles.tableColumn}>
                                      <Text
                                        style={{ ...styles.paragraph, ...{ paddingVertical: 5 } }}
                                      >
                                        {column.trim()}
                                      </Text>
                                    </Col>
                                  ))}
                                </Row>
                              ))}
                            </Grid>
                          );
                      }
                    };
                    return blockSwitch(block);
                  })}
                </>
              )}
            </>
          )}
        </View>
      )}
      <View style={styles.deleteTaskContainer}>
        <Text style={styles.deleteLogo}>Delete task</Text>
        <Pressable onPress={onTrashClick}>
          <Image
            style={styles.trashImage}
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            source={require('../../../../../../../assets/images/darkTheme/globalIcons/trash.webp')}
          />
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default TaskForm;
