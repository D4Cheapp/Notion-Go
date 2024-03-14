import React, { useState } from 'react';
import Checkbox from 'expo-checkbox';
import { View, Text } from 'react-native';
import { styles } from './CheckboxStyles';
import { BlockType } from '@/types';
import { Colors } from '@/constants/theme';

interface Props {
  block: BlockType;
}

const CheckboxBlock = ({ block }: Props): React.ReactNode => {
  const isCheck = block.parent[3] !== ' ';
  const [isPropChecked, setIsPropChecked] = useState(isCheck);

  const handlePropCheck = (checked: boolean): void => {
    setIsPropChecked(checked);
  };

  return (
    <View key={block.blockId} style={styles.checkboxContainer}>
      <Checkbox
        value={isPropChecked}
        style={styles.contentCheckbox}
        onValueChange={handlePropCheck}
        color={isPropChecked ? Colors.orange : undefined}
      />
      <Text style={styles.paragraph}>{block.parent.slice(5, block.parent.length)}</Text>
    </View>
  );
};

export default CheckboxBlock;
