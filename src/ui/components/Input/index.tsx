import { BlurEvent, TextInput, TextInputProps } from 'react-native';
import { inputStyles } from './styles';
import { theme } from '@ui/styles/theme';
import { useState } from 'react';
import { VariantProps } from '@ui/styles/utils/createVariants';

type BaseTextInputProps = Omit<TextInputProps, 'readOnly'>;

export interface IInputProps extends BaseTextInputProps {
  error?: boolean;
  disabled?: boolean;
  InputComponent?: React.ComponentType<TextInputProps>;
  ref?: React.Ref<TextInput>;
  formatter?: (value: string) => string;
}

export function Input({
  style,
  onFocus,
  onBlur,
  error,
  disabled,
  InputComponent = TextInput,
  formatter,
  onChangeText,
  ...props
}: IInputProps) {
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

  function handleChangeText(value: string) {
    const formattedValue = formatter?.(value) ?? value;

    onChangeText?.(formattedValue);
  }

  return (
    <InputComponent
      onFocus={handleFocus}
      onBlur={handleBlur}
      placeholderTextColor={theme.colors.gray[700]}
      onChangeText={handleChangeText}
      style={[
        inputStyles({ status: getInputStatus(), disabled: disabled ? 'true' : 'false' }),
        style,
      ]}
      {...props}
    />
  );
}
