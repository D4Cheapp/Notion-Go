import { Text, View } from 'react-native';
import React from 'react';
import { TaskType } from 'src/types';

interface Props {
  tasks: TaskType[];
}

function CalendarView({ tasks }: Props) {
  return (
    <View>
      <Text>TodoCalendar</Text>
    </View>
  );
}

export default CalendarView;
