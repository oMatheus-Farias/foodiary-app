import { BlurEvent, TextInput } from 'react-native';
import { inputStyles } from './styles';
import { theme } from '@ui/styles/theme';
import { useState } from 'react';
import { VariantProps } from '@ui/styles/utils/createVariants';

type BaseTextInputProps = Omit<React.ComponentProps<typeof TextInput>, 'readOnly'>;

export interface IInputProps extends BaseTextInputProps {
  error?: boolean;
  disabled?: boolean;
}

export function Input({ style, onFocus, onBlur, error, disabled, ...props }: IInputProps) {
  const [isFocused, setIsFocused] = useState(false);

  function handleFocus(event: BlurEvent) {
    setIsFocused(true);
    onFocus?.(event);
  }

  function handleBlur(event: BlurEvent) {
    setIsFocused(false);
    onBlur?.(event);
  }

  function getInputStatus(): VariantProps<typeof inputStyles>['status'] {
    if (error) {
      return 'error';
    }

    if (isFocused) {
      return 'focus';
    }

    return 'default';
  }

  return (
    <TextInput
      onFocus={handleFocus}
      onBlur={handleBlur}
      placeholderTextColor={theme.colors.gray[700]}
      style={[
        inputStyles({ status: getInputStatus(), disabled: disabled ? 'true' : 'false' }),
        style,
      ]}
      {...props}
    />
  );
}
