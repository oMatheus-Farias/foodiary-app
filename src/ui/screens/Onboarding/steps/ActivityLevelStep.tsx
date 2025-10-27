import { useOnboarding } from '../context/useOnboarding';
import { Step, StepContent, StepFooter, StepHeader, StepTitle } from '../components/Step';
import { Button } from '@ui/components/Button';
import { ArrowRightIcon } from 'lucide-react-native';
import { theme } from '@ui/styles/theme';
import {
  RadioGroup,
  RadioGroupDescription,
  RadioGroupIcon,
  RadioGroupItem,
  RadioGroupItemInfo,
  RadioGroupLabel,
} from '@ui/components/RadioGroup';

export enum ActivityLevel {
  SEDENTARY = 'SEDENTARY',
  LIGHT = 'LIGHT',
  MODERATE = 'MODERATE',
  HEAVY = 'HEAVY',
  ATHLETE = 'ATHLETE',
}

export function ActivityLevelStep() {
  const { nextStep } = useOnboarding();

  return (
    <Step>
      <StepHeader>
        <StepTitle>Qual o seu nível de atividade?</StepTitle>
      </StepHeader>

      <StepContent>
        <RadioGroup>
          <RadioGroupItem value={ActivityLevel.SEDENTARY}>
            <RadioGroupIcon>🪑</RadioGroupIcon>
            <RadioGroupItemInfo>
              <RadioGroupLabel>Sedentário</RadioGroupLabel>
              <RadioGroupDescription>Não me exercito</RadioGroupDescription>
            </RadioGroupItemInfo>
          </RadioGroupItem>

          <RadioGroupItem value={ActivityLevel.LIGHT}>
            <RadioGroupIcon>🍂</RadioGroupIcon>
            <RadioGroupItemInfo>
              <RadioGroupLabel>Leve</RadioGroupLabel>
              <RadioGroupDescription>1 a 2 vezes por semana</RadioGroupDescription>
            </RadioGroupItemInfo>
          </RadioGroupItem>

          <RadioGroupItem value={ActivityLevel.MODERATE}>
            <RadioGroupIcon>🏃‍♂️</RadioGroupIcon>
            <RadioGroupItemInfo>
              <RadioGroupLabel>Moderado</RadioGroupLabel>
              <RadioGroupDescription>3 a 5 vezes por semana</RadioGroupDescription>
            </RadioGroupItemInfo>
          </RadioGroupItem>

          <RadioGroupItem value={ActivityLevel.HEAVY}>
            <RadioGroupIcon>🔥</RadioGroupIcon>
            <RadioGroupItemInfo>
              <RadioGroupLabel>Pesado</RadioGroupLabel>
              <RadioGroupDescription>6 a 7 vezes por semana</RadioGroupDescription>
            </RadioGroupItemInfo>
          </RadioGroupItem>

          <RadioGroupItem value={ActivityLevel.ATHLETE}>
            <RadioGroupIcon>🏋️‍♂️</RadioGroupIcon>
            <RadioGroupItemInfo>
              <RadioGroupLabel>Atleta</RadioGroupLabel>
              <RadioGroupDescription>Treino profissional diário</RadioGroupDescription>
            </RadioGroupItemInfo>
          </RadioGroupItem>
        </RadioGroup>
      </StepContent>

      <StepFooter>
        <Button size="icon" onPress={nextStep}>
          <ArrowRightIcon size={20} color={theme.colors.black[700]} />
        </Button>
      </StepFooter>
    </Step>
  );
}
