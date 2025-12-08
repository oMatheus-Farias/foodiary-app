import { Platform, Pressable, View } from 'react-native';
import { AppText } from '../AppText';
import { styles } from './styles';
import { CameraIcon, LucideIcon, MicIcon } from 'lucide-react-native';
import { theme } from '@ui/styles/theme';
import { AudioModal } from '../AudioModal';
import { useState } from 'react';
import { PictureModal } from '../PictureModal';

interface ICreateMealOptionsProps {
  disabled?: boolean;
}

export function CreateMealOptions({ disabled = false }: ICreateMealOptionsProps) {
  const [currentVisibleModal, setCurrentVisibleModal] = useState<null | 'audio' | 'picture'>(null);

  function handleopenModal(modal: 'audio' | 'picture') {
    setCurrentVisibleModal(modal);
  }

  function handleCloseModal() {
    setCurrentVisibleModal(null);
  }

  return (
    <View style={styles.container}>
      <AudioModal visible={currentVisibleModal === 'audio'} onClose={handleCloseModal} />

      <PictureModal visible={currentVisibleModal === 'picture'} onClose={handleCloseModal} />

      <OptionButton
        icon={MicIcon}
        label="Áudio"
        disabled={disabled}
        onPress={() => handleopenModal('audio')}
      />
      <OptionButton
        icon={CameraIcon}
        label="Foto"
        disabled={disabled}
        onPress={() => handleopenModal('picture')}
      />
    </View>
  );
}

interface IOptionButtonProps {
  icon: LucideIcon;
  label: string;
  disabled?: boolean;
  onPress: () => void;
}

function OptionButton({ icon: Icon, label, disabled, onPress }: IOptionButtonProps) {
  return (
    <View style={styles.buttonWrapper}>
      <Pressable
        disabled={disabled}
        onPress={onPress}
        android_ripple={{ color: 'rgba(0, 0, 0, 0.1)', foreground: true }}
        style={({ pressed }) => [
          styles.button,
          disabled || (pressed && Platform.OS === 'ios') ? { opacity: 0.5 } : undefined,
        ]}
      >
        <View style={styles.icon}>
          <Icon color={theme.colors.black[700]} size={24} />
        </View>

        <AppText weight="semiBold" style={styles.buttonLabel}>
          {label}
        </AppText>
      </Pressable>
    </View>
  );
}
