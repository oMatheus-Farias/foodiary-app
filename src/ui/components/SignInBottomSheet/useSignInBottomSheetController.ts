import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useRef, useImperativeHandle, useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ISignInBottomSheet } from './ISignInBottomSheet';
import { Alert, TextInput } from 'react-native';
import { useForm } from 'react-hook-form';
import { signInSchema, SignInSchema } from './schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '@app/contexts/AuthContext/useAuth';

interface IUseSignInBottomSheetControllerProps {
  ref: React.Ref<ISignInBottomSheet>;
}

export function useSignInBottomSheetController({ ref }: IUseSignInBottomSheetControllerProps) {
  const { bottom } = useSafeAreaInsets();
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const { signIn } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

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
      setIsLoading(true);
      await signIn(data);
    } catch {
      setIsLoading(false);
      Alert.alert('Oops! As credenciais informadas são inválidas');
    }
  });

  return { bottom, bottomSheetModalRef, passwordInputRef, form, handleSubmit, isLoading };
}
