import React from 'react';
import { Text } from 'react-native';
import { styles } from './DatePropertyStyles';

const dateFormatter = (date: string): string => {
  let resultDateString = date[5] + date[6] + '/' + date[8] + date[9];
  if (date.includes('T')) {
    resultDateString += ' ' + date[11] + date[12] + ':' + date[14] + date[15];
  }
  return resultDateString;
};

interface Props {
  dueDate:
    | {
        end: string;
        start: string;
      }
    | undefined;
}

const DateProperty = ({ dueDate }: Props): React.ReactNode => {
  return (
    <>
      {dueDate?.start && <Text style={styles.date}>{dateFormatter(dueDate.start)}</Text>}
      {dueDate?.end && dueDate?.start && <Text style={styles.date}>{' / '}</Text>}
      {dueDate?.end && <Text style={styles.date}>{dateFormatter(dueDate.end)}</Text>}
    </>
  );
};

export default DateProperty;
