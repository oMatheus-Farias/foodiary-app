import { OnboardingStack } from '@ui/screens/Onboarding/OnboardingStack';
import { KeyboardAvoidingView, Platform } from 'react-native';
import { OnboardingProvider } from './context/OnboardingProvider';
import { OnboardingHeader } from './components/OnboardingHeader';
import { theme } from '@ui/styles/theme';

export function Onboarding() {
  return (
    <OnboardingProvider>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1, backgroundColor: theme.colors.white }}
      >
        <OnboardingHeader />
        <OnboardingStack />
      </KeyboardAvoidingView>
    </OnboardingProvider>
  );
}
