import { View } from 'react-native';
import { styles } from './styles';
import { AppText } from '../AppText';
import { theme } from '@ui/styles/theme';
import { cloneElement } from 'react';

interface IFormGroupProps {
  label: string;
  error?: string;
  children: React.ReactElement<{ error?: boolean }>;
}

export function FormGroup({ label, error, children }: IFormGroupProps) {
  return (
    <View style={styles.container}>
      <AppText weight="medium">{label}</AppText>

      {cloneElement(children, { error: !!error })}

      {error && (
        <AppText size="sm" color={theme.colors.support.red}>
          {error}
        </AppText>
      )}
    </View>
  );
}
