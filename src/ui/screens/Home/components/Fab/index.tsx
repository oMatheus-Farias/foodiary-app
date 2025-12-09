import { View } from 'react-native';
import { styles } from './styles';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button } from '@ui/components/Button';
import { PlusIcon } from 'lucide-react-native';
import { theme } from '@ui/styles/theme';
import { useRef } from 'react';
import { BottomSheetModal, BottomSheetModalProvider, BottomSheetView } from '@gorhom/bottom-sheet';
import { AppText } from '@ui/components/AppText';
import { CreateMealOptions } from '@ui/components/CreateMealOptions';

export function Fab() {
  const { bottom } = useSafeAreaInsets();
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  function handleOpenBottomSheet() {
    bottomSheetModalRef.current?.present();
  }

  function handleCloseBottomSheet() {
    bottomSheetModalRef.current?.dismiss();
  }

  return (
    <>
      <View style={[styles.container, { bottom }]}>
        <Button size="icon" onPress={handleOpenBottomSheet}>
          <PlusIcon size={20} color={theme.colors.black[700]} />
        </Button>
      </View>

      <BottomSheetModalProvider>
        <BottomSheetModal ref={bottomSheetModalRef} style={styles.bottomSheet}>
          <BottomSheetView style={[styles.content, { paddingBottom: bottom + 24 }]}>
            <AppText size="lg" weight="semiBold" align="center" style={styles.title}>
              Cadastre sua refeição
            </AppText>

            <CreateMealOptions onCreate={handleCloseBottomSheet} />
          </BottomSheetView>
        </BottomSheetModal>
      </BottomSheetModalProvider>
    </>
  );
}
