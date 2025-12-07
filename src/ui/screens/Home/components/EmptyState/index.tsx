import { AppText } from '@ui/components/AppText';
import { View } from 'react-native';
import { styles } from './styles';
import { theme } from '@ui/styles/theme';
import { CreateMealOptions } from '@ui/components/CreateMealOptions';
import { useHomeContext } from '../../context/useHomeContext';

export function EmptyState() {
  const { isLoading } = useHomeContext();

  return (
    <View style={[styles.container, isLoading && { opacity: 0.5 }]}>
      <AppText color={theme.colors.gray[700]}>
        Cadastre sua primeira refreição através de uma das opções abaixo:
      </AppText>

      <CreateMealOptions disabled={isLoading} />
    </View>
  );
}
