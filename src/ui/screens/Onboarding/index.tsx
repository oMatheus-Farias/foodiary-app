import { OnboardingStack } from '@ui/screens/Onboarding/OnboardingStack';
import { KeyboardAvoidingView, Platform } from 'react-native';
import { OnboardingProvider } from './context/OnboardingProvider';
import { OnboardingHeader } from './components/OnboardingHeader';
import { theme } from '@ui/styles/theme';
import { FormProvider, useForm } from 'react-hook-form';
import { onboardingSchema, OnboardingSchema } from './schema';
import { zodResolver } from '@hookform/resolvers/zod';

export function Onboarding() {
  const form = useForm<OnboardingSchema>({
    resolver: zodResolver(onboardingSchema as any),
    defaultValues: {
      birthDate: new Date(),
      height: '',
      weight: '',
      account: {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
      },
    },
  });

  return (
    <FormProvider {...form}>
      <OnboardingProvider>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1, backgroundColor: theme.colors.white }}
        >
          <OnboardingHeader />
          <OnboardingStack />
        </KeyboardAvoidingView>
      </OnboardingProvider>
    </FormProvider>
  );
}
