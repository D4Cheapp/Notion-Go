import React from 'react';
import { TaskType } from 'src/types';
import { Text, View } from 'react-native';

interface Props {
  tasks: TaskType[];
  completedTasks: string[];
}

const CalendarView = ({ tasks }: Props): React.ReactNode => {
  tasks;

  return (
    <View>
      <Text>TodoCalendar</Text>
    </View>
  );
};

export default CalendarView;
