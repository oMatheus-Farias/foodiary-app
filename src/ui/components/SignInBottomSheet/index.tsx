import { BottomSheetModalProvider, BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import { AppText } from '../AppText';
import { useSignInBottomSheetController } from './useSignInBottomSheetController';
import React from 'react';
import { ISignInBottomSheet } from './ISignInBottomSheet';
import { Input } from '../Input';
import { styles } from './styles';
import { FormGroup } from '../FormGroup';
import { View } from 'react-native';
import { Button } from '../Button';

interface ISignInBottomSheetProps {
  ref: React.Ref<ISignInBottomSheet>;
}

export function SignInBottomSheet({ ref }: ISignInBottomSheetProps) {
  const { bottom, bottomSheetModalRef } = useSignInBottomSheetController({ ref });

  return (
    <BottomSheetModalProvider>
      <BottomSheetModal ref={bottomSheetModalRef}>
        <BottomSheetView style={[styles.container, { paddingBottom: bottom }]}>
          <AppText size="3xl" weight="semiBold" style={styles.heading}>
            Acesse a sua conta
          </AppText>

          <View style={styles.form}>
            <FormGroup label="E-mail" error="Informe um e-mail válido">
              <Input />
            </FormGroup>

            <FormGroup label="Senha">
              <Input secureTextEntry />
            </FormGroup>

            <Button>Entrar</Button>
          </View>
        </BottomSheetView>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
}
