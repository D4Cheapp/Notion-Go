import React from 'react';
import { View, Image, Text, Pressable, Linking } from 'react-native';
import Checkbox from 'expo-checkbox';
import { Colors } from '@/constants/theme';
import { TaskPropertyType } from '@/types';
import { styles } from './TaskPropertyStyles';

interface Props {
  property: TaskPropertyType;
  propertyName?: string;
}

const handleDateToString = (date: string): string => {
  const isTimeExist = date.includes('T');
  const day = (isTimeExist ? date.split('T')[0] : date).split('-');
  const time = isTimeExist ? date.split('T')[1].split('.')[0] : null;
  return day[2] + '/' + day[1] + (time !== null ? ' ' + time?.slice(0, time.length - 3) : '');
};

const TaskProperty = ({ property, propertyName }: Props): React.ReactNode => {
  const { type } = property;
  let propertyContainerStyle = { ...styles.propertyContainer };
  if (propertyName) {
    propertyContainerStyle = { ...styles.propertyContainer, ...styles.modalWindowProperty };
  }

  const handleOpenFile = async (url: string) => {
    await Linking.openURL(url);
  };

  switch (type) {
    case 'rich_text':
      const isTextExist = property.rich_text.length > 0;
      if (isTextExist) {
        const { annotations, href, plain_text } = property.rich_text[0];
        const { bold, color, italic, strikethrough, underline } = annotations;
        const isCustomColor = color !== 'default';
        const textStyles = {
          ...styles.text,
        };
        if (bold) {
          Object.assign(textStyles, { ...styles.boldText });
        }
        if (isCustomColor) {
          Object.assign(textStyles, { ...{ color: Colors[color] } });
        }
        if (italic) {
          Object.assign(textStyles, { ...styles.italicText });
        }
        if (strikethrough) {
          Object.assign(textStyles, { ...styles.strikethroughText });
        }
        if (href || underline) {
          Object.assign(textStyles, { ...styles.linkText });
        }
        return (
          <View style={propertyContainerStyle}>
            <View style={styles.propertyLogo}>
              <Image
                style={styles.icon}
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                source={require('../../../../../../../assets/images/darkTheme/propertyIcons/textProp.webp')}
              />
              {propertyName && <Text style={styles.text}>{propertyName}</Text>}
            </View>
            <Text style={textStyles}>{plain_text}</Text>
          </View>
        );
      } else {
        return null;
      }

    case 'number':
      const isNumberExist = property.number !== null;
      if (isNumberExist) {
        const number = property.number;
        return (
          <View style={propertyContainerStyle}>
            <View style={styles.propertyLogo}>
              <Image
                style={styles.icon}
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                source={require('../../../../../../../assets/images/darkTheme/propertyIcons/numberProp.webp')}
              />
              {propertyName && <Text style={styles.text}>{propertyName}</Text>}
            </View>
            <Text style={styles.text}>{number}</Text>
          </View>
        );
      } else {
        return null;
      }

    case 'select':
      const isSelectExist = property.select !== null;
      if (isSelectExist) {
        const { color, name } = property.select;
        return (
          <View style={propertyContainerStyle}>
            <View style={styles.propertyLogo}>
              <Image
                style={styles.icon}
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                source={require('../../../../../../../assets/images/darkTheme/propertyIcons/selectProp.webp')}
              />
              {propertyName && <Text style={styles.text}>{propertyName}</Text>}
            </View>
            <Text style={{ ...styles.select, backgroundColor: Colors[color] }}>{name}</Text>
          </View>
        );
      } else {
        return null;
      }

    case 'multi_select':
      const isMultiSelectExist = property.multi_select.length > 0;
      if (isMultiSelectExist) {
        const options = property.multi_select;
        return (
          <View style={propertyContainerStyle}>
            <View style={styles.propertyLogo}>
              <Image
                style={styles.icon}
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                source={require('../../../../../../../assets/images/darkTheme/propertyIcons/multiSelectProp.webp')}
              />
              {propertyName && <Text style={styles.text}>{propertyName}</Text>}
            </View>
            <View style={styles.optionsContainer}>
              {options.map((option) => {
                const { color, name, id } = option;
                return (
                  <Text key={id} style={{ ...styles.select, backgroundColor: Colors[color] }}>
                    {name}
                  </Text>
                );
              })}
            </View>
          </View>
        );
      } else {
        return null;
      }

    case 'status':
      const isStatusExist = property.status !== null;
      if (isStatusExist) {
        const { color, name } = property.status;
        return (
          <View style={propertyContainerStyle}>
            <View style={styles.propertyLogo}>
              <Image
                style={styles.icon}
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                source={require('../../../../../../../assets/images/darkTheme/propertyIcons/statusProp.webp')}
              />
              {propertyName && <Text style={styles.text}>{propertyName}</Text>}
            </View>
            <Text style={{ ...styles.select, backgroundColor: Colors[color] }}>{name}</Text>
          </View>
        );
      } else {
        return null;
      }

    case 'date':
      const isDateExist = property.date !== null;
      if (isDateExist) {
        const { end, start } = property.date;
        return (
          <View style={propertyContainerStyle}>
            <View style={styles.propertyLogo}>
              <Image
                style={styles.icon}
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                source={require('../../../../../../../assets/images/darkTheme/propertyIcons/dateProp.webp')}
              />
              {propertyName && <Text style={styles.text}>{propertyName}</Text>}
            </View>
            <Text style={styles.text}>{handleDateToString(start)}</Text>
            {end && (
              <Text style={styles.text}>
                {'—  '}
                {handleDateToString(end)}
              </Text>
            )}
          </View>
        );
      } else {
        return null;
      }

    case 'checkbox':
      const checked = property.checkbox;
      return (
        <View style={propertyContainerStyle}>
          <View style={styles.propertyLogo}>
            <Image
              style={styles.icon}
              // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
              source={require('../../../../../../../assets/images/darkTheme/propertyIcons/checkProp.webp')}
            />
            {propertyName && <Text style={styles.text}>{propertyName}</Text>}
          </View>
          <Checkbox style={styles.checkbox} value={checked}></Checkbox>
        </View>
      );

    case 'url':
      const isUrlExist = property.url !== null;
      if (isUrlExist) {
        const url = property.url.slice(0, 25) + '...';
        return (
          <View style={propertyContainerStyle}>
            <View style={styles.propertyLogo}>
              <Image
                style={styles.icon}
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                source={require('../../../../../../../assets/images/darkTheme/propertyIcons/urlProp.webp')}
              />
              {propertyName && <Text style={styles.text}>{propertyName}</Text>}
            </View>
            <Text style={styles.text}>{url}</Text>
          </View>
        );
      } else {
        return null;
      }

    case 'email':
      const isEmailExist = property.email !== null;
      if (isEmailExist) {
        const email = property.email;
        return (
          <View style={propertyContainerStyle}>
            <View style={styles.propertyLogo}>
              <Image
                style={styles.icon}
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                source={require('../../../../../../../assets/images/darkTheme/propertyIcons/emailProp.webp')}
              />
              {propertyName && <Text style={styles.text}>{propertyName}</Text>}
            </View>
            <Text style={styles.text}>{email}</Text>
          </View>
        );
      } else {
        return null;
      }

    case 'phone_number':
      const isPhoneExist = property.phone_number !== null;
      if (isPhoneExist) {
        const phone = property.phone_number;
        return (
          <View style={propertyContainerStyle}>
            <View style={styles.propertyLogo}>
              <Image
                style={styles.icon}
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                source={require('../../../../../../../assets/images/darkTheme/propertyIcons/phoneProp.webp')}
              />
              {propertyName && <Text style={styles.text}>{propertyName}</Text>}
            </View>
            <Text style={styles.text}>{phone}</Text>
          </View>
        );
      } else {
        return null;
      }

    case 'created_time':
      const createdTime = property.created_time;
      return (
        <View style={propertyContainerStyle}>
          <View style={styles.propertyLogo}>
            <Image
              style={styles.icon}
              // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
              source={require('../../../../../../../assets/images/darkTheme/propertyIcons/timeProp.webp')}
            />
            {propertyName && <Text style={styles.text}>{propertyName}</Text>}
          </View>
          <Text style={styles.text}>{handleDateToString(createdTime)}</Text>
        </View>
      );

    case 'last_edited_time':
      const lastEditedTime = property.last_edited_time;
      return (
        <View style={propertyContainerStyle}>
          <View style={styles.propertyLogo}>
            <Image
              style={styles.icon}
              // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
              source={require('../../../../../../../assets/images/darkTheme/propertyIcons/timeProp.webp')}
            />
            {propertyName && <Text style={styles.text}>{propertyName}</Text>}
          </View>
          <Text style={styles.text}>{handleDateToString(lastEditedTime)}</Text>
        </View>
      );

    case 'unique_id':
      const id = property.unique_id.number;
      return (
        <View style={propertyContainerStyle}>
          <View style={styles.propertyLogo}>
            <Image
              style={styles.icon}
              // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
              source={require('../../../../../../../assets/images/darkTheme/propertyIcons/numberProp.webp')}
            />
            {propertyName && <Text style={styles.text}>{propertyName}</Text>}
          </View>
          <Text style={styles.text}>{id}</Text>
        </View>
      );

    case 'files':
      if (propertyName) {
        const isFilesExist = property.files.length > 0;
        if (isFilesExist) {
          const files = property.files;
          return (
            <View style={propertyContainerStyle}>
              <View style={styles.propertyLogo}>
                <Image
                  style={styles.icon}
                  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                  source={require('../../../../../../../assets/images/darkTheme/propertyIcons/fileProp.webp')}
                />
                {propertyName && <Text style={styles.text}>{propertyName}</Text>}
              </View>
              {files.map((file) => (
                // eslint-disable-next-line @typescript-eslint/no-misused-promises
                <Pressable key={file.file.url} onPress={() => handleOpenFile(file.file.url)}>
                  <Text style={styles.fileLinkText}>{file.name}</Text>
                </Pressable>
              ))}
            </View>
          );
        } else {
          return null;
        }
      }

    default:
      return null;
  }
};

export default TaskProperty;
