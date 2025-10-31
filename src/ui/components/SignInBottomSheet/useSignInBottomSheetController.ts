import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useRef, useImperativeHandle } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ISignInBottomSheet } from './ISignInBottomSheet';
import { Alert, TextInput } from 'react-native';
import { useForm } from 'react-hook-form';
import { signInSchema, SignInSchema } from './schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { AuthService } from '@app/services/AuthService';

interface IUseSignInBottomSheetControllerProps {
  ref: React.Ref<ISignInBottomSheet>;
}

export function useSignInBottomSheetController({ ref }: IUseSignInBottomSheetControllerProps) {
  const { bottom } = useSafeAreaInsets();
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const passwordInputRef = useRef<TextInput>(null);

  const form = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema as any),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  useImperativeHandle(
    ref,
    () => ({
      open: () => bottomSheetModalRef.current?.present(),
    }),
    [],
  );

  const handleSubmit = form.handleSubmit(async (data: SignInSchema) => {
    try {
      const response = await AuthService.signIn(data);
      console.log(JSON.stringify(response, null, 2));
    } catch {
      Alert.alert('Oops! As credenciais informadas são inválidas');
    }
  });

  return { bottom, bottomSheetModalRef, passwordInputRef, form, handleSubmit };
}
