import { Platform, Pressable, View } from 'react-native';
import { styles } from './styles';
import { AppText } from '@ui/components/AppText';
import { theme } from '@ui/styles/theme';
import { Meal } from '@app/types/Meal';
import { useMemo } from 'react';
import { useHomeContext } from '../../context/useHomeContext';

interface IMealCardProps {
  meal: Meal;
}

export function MealCard({ meal }: IMealCardProps) {
  const { isLoading } = useHomeContext();

  const formattedFoods = useMemo(
    () => meal.foods.map((food) => food.name).join(', '),
    [meal.foods],
  );

  const summary = useMemo(
    () =>
      meal.foods.reduce(
        (acc, food) => {
          acc.calories += food.calories;
          acc.proteins += food.proteins;
          acc.carbohydrates += food.carbohydrates;
          acc.fats += food.fats;

          return acc;
        },
        { calories: 0, proteins: 0, carbohydrates: 0, fats: 0 },
      ),
    [meal.foods],
  );

  return (
    <View style={[styles.container, isLoading && { opacity: 0.5 }]}>
      <AppText color={theme.colors.gray[700]}>{formatTime(meal.createdAt)}</AppText>

      <View style={styles.wrapper}>
        <Pressable
          disabled={isLoading}
          android_ripple={{ color: 'rgba(0, 0, 0, 0.1)', foreground: true }}
          style={({ pressed }) => [
            styles.card,
            isLoading || (pressed && Platform.OS === 'ios') ? { opacity: 0.5 } : undefined,
          ]}
        >
          <View style={styles.header}>
            <View style={styles.icon}>
              <AppText>{meal.icon}</AppText>
            </View>

            <View style={styles.mealDetails}>
              <AppText size="sm" color={theme.colors.gray[700]} numberOfLines={1}>
                {meal.name}
              </AppText>
              <AppText weight="medium" numberOfLines={1}>
                {formattedFoods}
              </AppText>
            </View>
          </View>

          <View style={styles.body}>
            <View style={styles.mealStatsRow}>
              <View style={styles.mealStat}>
                <AppText color={theme.colors.support.tomato} weight="medium">
                  {summary.calories}
                </AppText>
                <AppText color={theme.colors.gray[700]}>Kcal</AppText>
              </View>

              <View style={styles.mealStat}>
                <AppText color={theme.colors.support.teal} weight="medium">
                  {summary.proteins}g
                </AppText>
                <AppText color={theme.colors.gray[700]}>Proteínas</AppText>
              </View>
            </View>

            <View style={styles.mealStatsRow}>
              <View style={styles.mealStat}>
                <AppText color={theme.colors.support.yellow} weight="medium">
                  {summary.carbohydrates}g
                </AppText>
                <AppText color={theme.colors.gray[700]}>Carboidratos</AppText>
              </View>

              <View style={styles.mealStat}>
                <AppText color={theme.colors.support.orange} weight="medium">
                  {summary.fats}g
                </AppText>
                <AppText color={theme.colors.gray[700]}>Gorduras</AppText>
              </View>
            </View>
          </View>
        </Pressable>
      </View>
    </View>
  );
}

function formatTime(date: Date) {
  const BRAZIL_TIME_OFFSET = 3;

  const hours = (date.getHours() - BRAZIL_TIME_OFFSET).toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');

  return `${hours}h${minutes}`;
}
