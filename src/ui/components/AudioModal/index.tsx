import { Modal, StatusBar, View } from 'react-native';
import { styles } from './styles';
import { theme } from '@ui/styles/theme';
import { Button } from '../Button';
import { XIcon } from 'lucide-react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { AppText } from '../AppText';
import { useAudioModalController } from './useAudioModalController';
import { Actions } from './components/Actions';
import { CreateMealLoader } from '../CreateMealLoader';

interface IAudioModalProps {
  visible: boolean;
  onClose: () => void;
}

export function AudioModal({ visible, onClose }: IAudioModalProps) {
  const {
    state,
    audioUri,
    isRecording,
    isLoading,
    handleStartRecording,
    handleStopRecording,
    handleTryAgain,
    handleConfirm,
  } = useAudioModalController();

  return (
    <Modal
      visible={visible}
      onRequestClose={onClose}
      transparent
      statusBarTranslucent
      animationType="slide"
    >
      <StatusBar barStyle="light-content" translucent animated />

      {isLoading && <CreateMealLoader type="audio" />}

      {!isLoading && (
        <View style={styles.container}>
          <SafeAreaProvider>
            <SafeAreaView style={styles.content}>
              <View style={styles.header}>
                <Button variant="neutral" size="icon" rippleStyle="light" onPress={onClose}>
                  <XIcon color={theme.colors.gray[500]} size={20} />
                </Button>
              </View>

              <View style={styles.body}>
                <View style={[styles.circle1, isRecording && styles.circle1Recording]}>
                  <View style={[styles.circle2, isRecording && styles.circle2Recording]}>
                    <View style={[styles.circle3, isRecording && styles.circle3Recording]} />
                  </View>
                </View>

                <AppText
                  color={theme.colors.gray[500]}
                  align="center"
                  style={styles.instructionsLabel}
                >
                  Tente dizer algo como: 100g de Arroz, 2 Ovos e 100g de Salada
                </AppText>
              </View>

              <View style={styles.footer}>
                <View style={styles.actionsContainer}>
                  <Actions
                    state={state}
                    audioUri={audioUri}
                    onStartRecording={handleStartRecording}
                    onStopRecording={handleStopRecording}
                    onTryAgain={handleTryAgain}
                    onConfirm={handleConfirm}
                  />
                </View>
              </View>
            </SafeAreaView>
          </SafeAreaProvider>
        </View>
      )}
    </Modal>
  );
}
