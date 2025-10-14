import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useRef, useImperativeHandle } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ISignInBottomSheet } from './ISignInBottomSheet';
import { Alert, TextInput } from 'react-native';

interface IUseSignInBottomSheetControllerProps {
  ref: React.Ref<ISignInBottomSheet>;
}

export function useSignInBottomSheetController({ ref }: IUseSignInBottomSheetControllerProps) {
  const { bottom } = useSafeAreaInsets();
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const passwordInputRef = useRef<TextInput>(null);

  useImperativeHandle(
    ref,
    () => ({
      open: () => bottomSheetModalRef.current?.present(),
    }),
    [],
  );

  function handleSubmit() {
    return Alert.alert('Enviando formulário...');
  }

  return { bottom, bottomSheetModalRef, passwordInputRef, handleSubmit };
}
