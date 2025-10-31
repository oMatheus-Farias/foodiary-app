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
import {
  RadioGroup,
  RadioGroupIcon,
  RadioGroupItem,
  RadioGroupLabel,
} from '@ui/components/RadioGroup';
import { Gender } from '@app/types/Gender';
import { Controller, useFormContext } from 'react-hook-form';
import { OnboardingSchema } from '../schema';

export function GenderStep() {
  const { nextStep } = useOnboarding();
  const form = useFormContext<OnboardingSchema>();

  async function handleNextStep() {
    const isValid = await form.trigger('gender');

    if (isValid) {
      return nextStep();
    }

    return;
  }

  return (
    <Step>
      <StepHeader>
        <StepTitle>Qual é o seu gênero?</StepTitle>
        <StepSubtitle>Seu gênero influencia no tipo da dieta</StepSubtitle>
      </StepHeader>

      <StepContent>
        <Controller
          control={form.control}
          name="gender"
          render={({ field, fieldState }) => (
            <RadioGroup
              orientation="horizontal"
              value={field.value}
              onChangeValue={(value) => {
                field.onChange(value);
                form.trigger('gender');
              }}
              error={!!fieldState.error}
            >
              <RadioGroupItem value={Gender.MALE}>
                <RadioGroupIcon>👨‍🦰</RadioGroupIcon>
                <RadioGroupLabel>Masculino</RadioGroupLabel>
              </RadioGroupItem>

              <RadioGroupItem value={Gender.FEMALE}>
                <RadioGroupIcon>👩‍🦰</RadioGroupIcon>
                <RadioGroupLabel>Feminino</RadioGroupLabel>
              </RadioGroupItem>
            </RadioGroup>
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
