import React, { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { styles } from '../TaskFormStyles';
import { BlockType } from '@/types';

interface Props {
  block: BlockType;
}

const TitleBlock = ({ block }: Props): React.ReactNode => {
  const [isTitleToggle, setIsTitleToggle] = useState(false);
  const isToggle = block.children.length > 0;
  const headerType = block.type;
  const title = block.parent.includes('head')
    ? block.parent.slice(parseInt(headerType[headerType.length - 1]) + 1, block.parent.length)
    : block.parent;

  const headerStyle = () => {
    switch (headerType) {
      case 'heading_1':
        return styles.headerOne;
      case 'heading_2':
        return styles.headerTwo;
      case 'heading_3':
        return styles.headerThree;
      case 'paragraph':
        return styles.paragraph;
      case 'toggle':
        return styles.paragraph;
    }
  };

  const handleTitleToggle = () => {
    setIsTitleToggle(!isTitleToggle);
  };

  return (
    <>
      {isToggle ? (
        <View>
          <Pressable onPress={handleTitleToggle}>
            <Text style={headerStyle()}>
              {isTitleToggle ? '▼' : '▶'} {title}
            </Text>
          </Pressable>
          {isTitleToggle && (
            <>
              {/* @ts-ignore */}
              {block.children.map((child: BlockType) => (
                <Text key={child.blockId} style={{ ...styles.paragraph, ...{ marginLeft: 30 } }}>
                  {'●  '}
                  {child.parent}
                </Text>
              ))}
            </>
          )}
        </View>
      ) : (
        <Text style={headerStyle()}>{title}</Text>
      )}
    </>
  );
};

export default TitleBlock;
