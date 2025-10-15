import { AppText } from '@ui/components/AppText';
import { View } from 'react-native';
import { useOnboarding } from '../context/useOnboarding';
import { Button } from '@ui/components/Button';

export function ActivityLevelStep() {
  const { currentStepIndex, nextStep } = useOnboarding();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <AppText size="3xl" weight="semiBold">
        ActivityLevelStep
      </AppText>

      <View>
        <AppText>{currentStepIndex}</AppText>
        <Button onPress={nextStep}>Avançar</Button>
      </View>
    </View>
  );
}
