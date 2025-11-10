import { Alert, TextInput, View } from 'react-native';
import { Button } from '@ui/components/Button';
import { useRef } from 'react';
import {
  Step,
  StepHeader,
  StepTitle,
  StepSubtitle,
  StepContent,
  StepFooter,
} from '../components/Step';
import { FormGroup } from '@ui/components/FormGroup';
import { Input } from '@ui/components/Input';
import { Controller, useFormContext } from 'react-hook-form';
import { OnboardingSchema } from '../schema';
import { isAxiosError } from 'axios';
import { ErrorCode } from '@app/types/ErrorCode';
import { useAuth } from '@app/contexts/AuthContext/useAuth';

export function CreateAccountStep() {
  const emailInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const confirmPasswordInputRef = useRef<TextInput>(null);

  const form = useFormContext<OnboardingSchema>();
  const { signUp } = useAuth();

  const formIsSubmitting = form.formState.isSubmitting;

  const handleSubmit = form.handleSubmit(async (data: OnboardingSchema) => {
    const birthDate = data.birthDate.toISOString().split('T')[0];

    try {
      await signUp({
        account: {
          email: data.account.email,
          password: data.account.password,
        },
        profile: {
          name: data.account.name,
          birthDate,
          gender: data.gender,
          goal: data.goal,
          height: Number(data.height),
          weight: Number(data.weight),
          activityLevel: data.activityLevel,
        },
      });
    } catch (error) {
      if (
        isAxiosError(error) &&
        error.response?.data?.error?.code === ErrorCode.EMAIL_ALREADY_IN_USE
      ) {
        Alert.alert('Oops! O e-mail informado já está em uso');
        return;
      }

      Alert.alert('Oops! As informações são inválidas');
    }
  });

  return (
    <Step>
      <StepHeader>
        <StepTitle>Crie sua conta</StepTitle>
        <StepSubtitle>Para poder visualizar o seu progresso</StepSubtitle>
      </StepHeader>

      <StepContent>
        <View style={{ gap: 24 }}>
          <Controller
            control={form.control}
            name="account.name"
            render={({ field, fieldState }) => (
              <FormGroup label="Nome" error={fieldState.error?.message}>
                <Input
                  autoFocus
                  placeholder="João Silva"
                  autoCapitalize="words"
                  autoCorrect={false}
                  autoComplete="name"
                  returnKeyType="next"
                  onSubmitEditing={() => emailInputRef.current?.focus()}
                  value={field.value}
                  onChangeText={field.onChange}
                  disabled={formIsSubmitting}
                />
              </FormGroup>
            )}
          />

          <Controller
            control={form.control}
            name="account.email"
            render={({ field, fieldState }) => (
              <FormGroup label="E-mail" error={fieldState.error?.message}>
                <Input
                  ref={emailInputRef}
                  placeholder="joaosilva@gmail.com"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  autoComplete="email"
                  returnKeyType="next"
                  onSubmitEditing={() => passwordInputRef.current?.focus()}
                  value={field.value}
                  onChangeText={field.onChange}
                  disabled={formIsSubmitting}
                />
              </FormGroup>
            )}
          />

          <Controller
            control={form.control}
            name="account.password"
            render={({ field, fieldState }) => (
              <FormGroup label="Senha" error={fieldState.error?.message}>
                <Input
                  ref={passwordInputRef}
                  placeholder="Mínimo 8 caracteres"
                  secureTextEntry
                  autoCapitalize="none"
                  autoCorrect={false}
                  autoComplete="new-password"
                  returnKeyType="done"
                  onSubmitEditing={() => confirmPasswordInputRef.current?.focus()}
                  value={field.value}
                  onChangeText={field.onChange}
                  disabled={formIsSubmitting}
                />
              </FormGroup>
            )}
          />

          <Controller
            control={form.control}
            name="account.confirmPassword"
            render={({ field, fieldState }) => (
              <FormGroup label="Confirmar Senha" error={fieldState.error?.message}>
                <Input
                  ref={confirmPasswordInputRef}
                  placeholder="Mínimo 8 caracteres"
                  secureTextEntry
                  autoCapitalize="none"
                  autoCorrect={false}
                  autoComplete="new-password"
                  returnKeyType="done"
                  onSubmitEditing={handleSubmit}
                  value={field.value}
                  onChangeText={field.onChange}
                  disabled={formIsSubmitting}
                />
              </FormGroup>
            )}
          />
        </View>
      </StepContent>

      <StepFooter align="start">
        <Button onPress={handleSubmit} isLoading={formIsSubmitting}>
          Criar Conta
        </Button>
      </StepFooter>
    </Step>
  );
}
