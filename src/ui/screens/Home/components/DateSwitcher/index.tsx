import { View } from 'react-native';
import { Button } from '@ui/components/Button';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react-native';
import { AppText } from '@ui/components/AppText';
import { styles } from './styles';
import { theme } from '@ui/styles/theme';
import { useHomeContext } from '../../context/useHomeContext';

export function DateSwitcher() {
  const { date, isLoading, previousDay, nextDay } = useHomeContext();

  return (
    <View style={[styles.container, isLoading && { opacity: 0.5 }]}>
      <Button size="icon" variant="ghost" onPress={previousDay} disabled={isLoading}>
        <ChevronLeftIcon />
      </Button>

      <AppText color={theme.colors.gray[700]} weight="medium" style={styles.selectedDate}>
        {formatDate(date)}
      </AppText>

      <Button size="icon" variant="ghost" onPress={nextDay} disabled={isLoading}>
        <ChevronRightIcon />
      </Button>
    </View>
  );
}

function formatDate(date: Date) {
  const now = new Date();
  const isToday = now.toDateString() === date.toDateString();

  const formattedDate = Intl.DateTimeFormat('pt-BR', {
    weekday: isToday ? undefined : 'long',
    day: '2-digit',
    month: 'long',
  })
    .format(date)
    .toUpperCase();

  return isToday ? `HOJE, ${formattedDate}` : formattedDate;
}
