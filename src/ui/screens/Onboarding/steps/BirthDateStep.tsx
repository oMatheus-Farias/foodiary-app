import { useOnboarding } from '../context/useOnboarding';
import {
  Step,
  StepContent,
  StepFooter,
  StepHeader,
  StepSubtitle,
  StepTitle,
} from '../components/Step';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';

import { Button } from '@ui/components/Button';
import { ArrowRightIcon } from 'lucide-react-native';
import { theme } from '@ui/styles/theme';
import { Platform, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { AppText } from '@ui/components/AppText';

export function BirthDateStep() {
  const [date, setDate] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisible] = useState(true);

  const { nextStep } = useOnboarding();

  function handleSelectDate(_event: DateTimePickerEvent, newDate?: Date) {
    if (!newDate) {
      return;
    }

    setDate(newDate);
    if (Platform.OS === 'android') {
      setDatePickerVisible(false);
    }
  }

  return (
    <Step>
      <StepHeader>
        <StepTitle>Que dia você nasceu?</StepTitle>
        <StepSubtitle>Cada faixa etária responde de forma única</StepSubtitle>
      </StepHeader>

      <StepContent position="center">
        {isDatePickerVisible && (
          <DateTimePicker
            mode="date"
            value={date}
            onChange={handleSelectDate}
            display={Platform.OS === 'ios' ? 'spinner' : 'calendar'}
          />
        )}

        {Platform.OS === 'android' && (
          <TouchableOpacity onPress={() => setDatePickerVisible(true)}>
            <AppText weight="semiBold" size="2xl" color={theme.colors.gray[700]}>
              {date.toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
              })}
            </AppText>
          </TouchableOpacity>
        )}
      </StepContent>

      <StepFooter>
        <Button size="icon" onPress={nextStep}>
          <ArrowRightIcon size={20} color={theme.colors.black[700]} />
        </Button>
      </StepFooter>
    </Step>
  );
}
