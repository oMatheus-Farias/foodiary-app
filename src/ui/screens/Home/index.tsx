import { AppText } from '@ui/components/AppText';
import { WelcomeModal } from '@ui/components/WelcomeModal';
import { View } from 'react-native';

export function Home() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <WelcomeModal />
      <AppText>home</AppText>
    </View>
  );
}
