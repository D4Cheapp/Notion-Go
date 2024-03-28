import React, { useEffect } from 'react';
import { Text, Image, Pressable, View } from 'react-native';
import { ErrorMessageType } from 'src/reduxjs/base/types';
import { styles } from './ErrorMessageStyles';

interface Props {
  error: ErrorMessageType;
  onCloseClick: (index: number) => void;
}

const ErrorMessage = ({ error, onCloseClick }: Props): React.ReactNode => {
  useEffect(() => {
    const closeTimeout = setTimeout(() => onCloseClick(error.id), 4000);
    return () => clearTimeout(closeTimeout);
  }, []);

  return (
    <View style={styles.errorContainer}>
      <Text style={[styles.text, styles.text]}>Error: {error.message}</Text>
      <Pressable onPress={() => onCloseClick(error.id)}>
        <Image
          style={styles.closeButton}
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          source={require('../../../assets/images/darkTheme/globalIcons/cross.webp')}
        />
      </Pressable>
    </View>
  );
};

export default ErrorMessage;
