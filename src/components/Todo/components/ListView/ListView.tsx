import { Text, View } from 'react-native';
import React from 'react';

interface TodoListInterface {}

function ListView({}: TodoListInterface) {
  return (
    <View>
      <Text>TodoList</Text>
    </View>
  );
}

export default ListView;
