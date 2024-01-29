import { Text, View } from 'react-native';
import React from 'react';
import { TasksType } from 'components/Todo/Todo';

interface Props {
  tasks: TasksType;
}

function CalendarView({ tasks }: Props) {
  return (
    <View>
      <Text>TodoCalendar</Text>
    </View>
  );
}

export default CalendarView;
