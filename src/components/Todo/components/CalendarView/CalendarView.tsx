import React from 'react';
import { TaskType } from 'src/types';
import { Text, View } from 'react-native';

interface Props {
  tasks: TaskType[];
}

function CalendarView({ tasks }: Props) {
  tasks;

  return (
    <View>
      <Text>TodoCalendar</Text>
    </View>
  );
}

export default CalendarView;
