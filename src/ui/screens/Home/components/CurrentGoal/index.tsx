import { View } from 'react-native';
import { styles } from './styles';
import { GoalStats } from '@ui/components/GoalStats';
import { useAccount } from '@app/hooks/queries/useAccount';
import { useMemo } from 'react';
import { useHomeContext } from '../../context/useHomeContext';

export function CurrentGoal() {
  const { account } = useAccount();
  const { meals, isLoading } = useHomeContext();

  const summary = useMemo(
    () =>
      meals
        .flatMap((meal) => meal.foods)
        .reduce(
          (acc, food) => {
            acc.calories += food.calories;
            acc.proteins += food.proteins;
            acc.carbohydrates += food.carbohydrates;
            acc.fats += food.fats;

            return acc;
          },
          { calories: 0, proteins: 0, carbohydrates: 0, fats: 0 },
        ),
    [meals],
  );

  return (
    <View style={[styles.container, isLoading && { opacity: 0.5 }]}>
      <GoalStats
        calories={{ goal: account!.goal.calories, current: summary.calories }}
        proteins={{ goal: account!.goal.proteins, current: summary.proteins }}
        carbohydrates={{ goal: account!.goal.carbohydrates, current: summary.carbohydrates }}
        fats={{ goal: account!.goal.fats, current: summary.fats }}
      />
    </View>
  );
}
