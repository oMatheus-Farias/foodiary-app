import { View } from 'react-native';
import { UserHeader } from '../UserHeader';
import { DateSwitcher } from '../DateSwitcher';
import { styles } from './styles';
import { CurrentGoal } from '../CurrentGoal';
import { AppText } from '@ui/components/AppText';
import { useHomeContext } from '../../context/useHomeContext';

export function Header() {
  const { isLoading } = useHomeContext();

  return (
    <View>
      <UserHeader />

      <View style={styles.container}>
        <DateSwitcher />
        <CurrentGoal />

        <View style={styles.divider} />
        <AppText weight="medium" style={[styles.mealsLabel, isLoading && { opacity: 0.5 }]}>
          Refeições
        </AppText>
      </View>
    </View>
  );
}
