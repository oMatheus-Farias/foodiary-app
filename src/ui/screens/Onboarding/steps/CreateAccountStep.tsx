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

export function CreateAccountStep() {
  const emailInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const confirmPasswordInputRef = useRef<TextInput>(null);

  function handleSubmit() {
    Alert.alert('Conta criada com sucesso!');
  }

  return (
    <Step>
      <StepHeader>
        <StepTitle>Crie sua conta</StepTitle>
        <StepSubtitle>Para poder visualizar o seu progresso</StepSubtitle>
      </StepHeader>

      <StepContent>
        <View style={{ gap: 24 }}>
          <FormGroup label="Nome">
            <Input
              autoFocus
              placeholder="João Silva"
              autoCapitalize="words"
              autoCorrect={false}
              autoComplete="name"
              returnKeyType="next"
              onSubmitEditing={() => emailInputRef.current?.focus()}
            />
          </FormGroup>

          <FormGroup label="E-mail">
            <Input
              ref={emailInputRef}
              placeholder="joaosilva@gmail.com"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              autoComplete="email"
              returnKeyType="next"
              onSubmitEditing={() => passwordInputRef.current?.focus()}
            />
          </FormGroup>

          <FormGroup label="Senha">
            <Input
              ref={passwordInputRef}
              placeholder="Mínimo 8 caracteres"
              secureTextEntry
              autoCapitalize="none"
              autoCorrect={false}
              autoComplete="new-password"
              returnKeyType="done"
              onSubmitEditing={() => confirmPasswordInputRef.current?.focus()}
            />
          </FormGroup>

          <FormGroup label="Confirmar Senha">
            <Input
              ref={confirmPasswordInputRef}
              placeholder="Mínimo 8 caracteres"
              secureTextEntry
              autoCapitalize="none"
              autoCorrect={false}
              autoComplete="new-password"
              returnKeyType="done"
              onSubmitEditing={handleSubmit}
            />
          </FormGroup>
        </View>
      </StepContent>

      <StepFooter align="start">
        <Button onPress={handleSubmit}>Criar Conta</Button>
      </StepFooter>
    </Step>
  );
}
