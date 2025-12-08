import { CameraView, useCameraPermissions } from 'expo-camera';
import { useRef, useState } from 'react';

export function usePictureModalController() {
  const cameraRef = useRef<CameraView>(null);

  const [permission, requestPermission] = useCameraPermissions();
  const [pictureUri, setPictureUri] = useState<string | null>(null);

  async function handleTakePicture() {
    if (!cameraRef.current) {
      return;
    }

    const picture = await cameraRef.current.takePictureAsync({
      imageType: 'jpg',
    });

    setPictureUri(picture.uri);
  }

  async function handleTryAgain() {
    setPictureUri(null);
  }

  async function handleConfirm() {
    alert('Confirmação da foto?');
  }

  return {
    isLoading: false,
    permission,
    cameraRef,
    pictureUri,
    requestPermission,
    handleTakePicture,
    handleTryAgain,
    handleConfirm,
  };
}
