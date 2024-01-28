import React, { useEffect } from 'react';
import { Text, Image, Pressable, View } from 'react-native';
import { styles } from './ErrorMessageStyles';
import { ErrorType } from '../ErrorContext';

interface Props {
  error: ErrorType;
  onCloseClick: (index: number) => void;
}

function ErrorMessage({ error, onCloseClick }: Props): React.ReactNode {
  useEffect(() => {
    const closeTimeout = setTimeout(() => onCloseClick(error.id), 4000);
    return () => clearTimeout(closeTimeout);
  }, []);

  return (
    <View style={styles.errorContainer}>
      <Text style={[styles.text, styles.text]}>Ошибка: {error.message}</Text>

      <Pressable onPress={() => onCloseClick(error.id)}>
        <Image
          style={styles.closeButton}
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          source={require('../../../assets/images/cross.png')}
        />
      </Pressable>
    </View>
  );
}

export default ErrorMessage;
