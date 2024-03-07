import { useEffect, useRef } from 'react';
import { Animated, Easing, View } from 'react-native';
import { isLoadingSelector, taskViewSelector } from 'src/reduxjs/base/selectors';
import { tasksSelector } from 'src/reduxjs/api/selectors';
import ListView from './components/ListView';
import CalendarView from './components/CalendarView';
import { styles } from './TodoStyles';
import { useAppSelector } from '@/hooks/reduxHooks';

function Todo() {
  const loadingAnimation = useRef(new Animated.Value(0)).current;
  const taskView = useAppSelector(taskViewSelector);
  const tasks = useAppSelector(tasksSelector);
  const isLoading = useAppSelector(isLoadingSelector);

  const spin = loadingAnimation.interpolate({
    inputRange: [0, 1, 2],
    outputRange: ['0deg', '360deg', '720deg'],
  });

  useEffect(() => {
    if (isLoading) {
      Animated.loop(
        Animated.timing(loadingAnimation, {
          toValue: 2,
          duration: 3000,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ).start();
    }
  }, [isLoading]);

  return (
    <View style={styles.todoContainer}>
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <Animated.View style={{ ...styles.loadingCircle, transform: [{ rotate: spin }] }} />
        </View>
      ) : (
        <>
          {taskView === 'calendar' && <CalendarView tasks={tasks} />}
          {taskView === 'list' && <ListView tasks={tasks} />}
        </>
      )}
    </View>
  );
}

export default Todo;
