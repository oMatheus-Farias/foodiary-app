import { AppText } from '@ui/components/AppText';
import { View } from 'react-native';
import { styles } from './styles';
import { useNavigation, useRoute } from '@react-navigation/native';
import { AppStackRouteProps } from '@app/navigation/AppStack';
import { Button } from '@ui/components/Button';

export function MealDetails() {
  const { params } = useRoute<AppStackRouteProps<'MealDetails'>>();
  const { goBack } = useNavigation();

  return (
    <View style={styles.container}>
      <AppText>Meal Details: {params.mealId}</AppText>
      <Button onPress={goBack}>Voltar</Button>
    </View>
  );
}
