import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useRef, useImperativeHandle } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ISignInBottomSheet } from './ISignInBottomSheet';

interface IUseSignInBottomSheetControllerProps {
  ref: React.Ref<ISignInBottomSheet>;
}

export function useSignInBottomSheetController({ ref }: IUseSignInBottomSheetControllerProps) {
  const { bottom } = useSafeAreaInsets();
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  useImperativeHandle(
    ref,
    () => ({
      open: () => bottomSheetModalRef.current?.present(),
    }),
    [],
  );

  return { bottom, bottomSheetModalRef };
}
