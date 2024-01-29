import { Text, View } from 'react-native';
import React from 'react';
import { TasksType } from 'components/Todo/Todo';

interface Props {
  tasks: TasksType;
}

function ListView({}: Props) {
  return (
    <View>
      <Text>TodoList</Text>
    </View>
  );
}

export default ListView;
