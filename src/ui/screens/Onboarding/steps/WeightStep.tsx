import { useOnboarding } from '../context/useOnboarding';
import {
  Step,
  StepContent,
  StepFooter,
  StepHeader,
  StepSubtitle,
  StepTitle,
} from '../components/Step';
import { Button } from '@ui/components/Button';
import { ArrowRightIcon } from 'lucide-react-native';
import { theme } from '@ui/styles/theme';
import { FormGroup } from '@ui/components/FormGroup';
import { Input } from '@ui/components/Input';
import { formatDecimal } from '@ui/utils/formatDecimal';
import { Controller, useFormContext } from 'react-hook-form';
import { OnboardingSchema } from '../schema';

export enum Goal {
  LOSE = 'LOSE',
  MAINTAIN = 'MAINTAIN',
  GAIN = 'GAIN',
}

export function WeightStep() {
  const { nextStep } = useOnboarding();
  const form = useFormContext<OnboardingSchema>();

  async function handleNextStep() {
    const isValid = await form.trigger('weight');

    if (isValid) {
      return nextStep();
    }

    return;
  }

  return (
    <Step>
      <StepHeader>
        <StepTitle>Qual é seu peso?</StepTitle>
        <StepSubtitle>Você pode inserir uma estimativa</StepSubtitle>
      </StepHeader>

      <StepContent position="center">
        <Controller
          control={form.control}
          name="weight"
          render={({ field, fieldState }) => (
            <FormGroup label="Peso" style={{ width: '100%' }} error={fieldState.error?.message}>
              <Input
                autoFocus
                placeholder="80"
                keyboardType="numeric"
                formatter={formatDecimal}
                value={field.value}
                onChangeText={(value) => {
                  field.onChange(value);
                  form.trigger('weight');
                }}
              />
            </FormGroup>
          )}
        />
      </StepContent>

      <StepFooter>
        <Button size="icon" onPress={handleNextStep}>
          <ArrowRightIcon size={20} color={theme.colors.black[700]} />
        </Button>
      </StepFooter>
    </Step>
  );
}
