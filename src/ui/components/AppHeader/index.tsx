import { useNavigation } from '@react-navigation/native';
import { View } from 'react-native';
import { styles } from './styles';
import { Button } from '../Button';
import { ChevronLeftIcon } from 'lucide-react-native';
import { theme } from '@ui/styles/theme';
import { AppText } from '../AppText';

interface IAppHeaderProps {
  title: string;
  rightAction?: React.ReactNode;
}

export function AppHeader({ title, rightAction }: IAppHeaderProps) {
  const { goBack } = useNavigation();

  return (
    <View style={styles.container}>
      <Button size="icon" variant="ghost" onPress={goBack}>
        <ChevronLeftIcon size={24} color={theme.colors.black[700]} />
      </Button>

      <AppText size="sm" align="center" style={styles.title}>
        {title}
      </AppText>

      <View style={styles.rightAction}>{rightAction}</View>
    </View>
  );
}
