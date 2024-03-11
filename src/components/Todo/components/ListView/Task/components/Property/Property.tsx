import React from 'react';
import { Text } from 'react-native';
import { styles } from './PropertyStyles';
import { Colors } from '@/constants/theme';

interface Props {
  text: string;
  color: string;
}

const Property = ({ text, color }: Props): React.ReactNode => {
  return (
    <>
      <Text
        style={{
          ...styles.priorityProperty,
          ...{
            backgroundColor:
              Colors[
                color as
                  | 'gray'
                  | 'brown'
                  | 'orange'
                  | 'yellow'
                  | 'green'
                  | 'blue'
                  | 'purple'
                  | 'pink'
                  | 'red'
              ],
          },
        }}
      >
        {text}
      </Text>
    </>
  );
};

export default Property;
