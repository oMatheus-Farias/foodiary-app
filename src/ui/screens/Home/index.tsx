import { WelcomeModal } from '@ui/components/WelcomeModal';
import { FlatList, RefreshControl, View } from 'react-native';
import { styles } from './styles';
import { Header } from './components/Header';
import { theme } from '@ui/styles/theme';
import { EmptyState } from './components/EmptyState';
import { MealCard } from './components/MealCard';
import { ItemSeparator } from './components/ItemSeparator';
import { FullScreenLoader } from './components/FullScreenLoader';
import { useHomeController } from './useHomeController';
import { HomeProvider } from './context/HomeProvider';

export function Home() {
  const {
    bottom,
    date,
    meals,
    top,
    isInitialLoading,
    isLoading,
    isRefreshing,
    handleRefresh,
    handlePreviousDay,
    handleNextDay,
  } = useHomeController();

  if (isInitialLoading) {
    return <FullScreenLoader />;
  }

  return (
    <View style={[styles.container, { paddingTop: top }]}>
      <WelcomeModal />

      <HomeProvider
        date={date}
        meals={meals}
        isLoading={isLoading}
        nextDay={handleNextDay}
        previousDay={handlePreviousDay}
      >
        <FlatList
          data={meals}
          keyExtractor={(item) => String(item.id)}
          contentContainerStyle={[styles.content, { paddingBottom: bottom + 24 }]}
          ListHeaderComponent={Header}
          ListEmptyComponent={EmptyState}
          ItemSeparatorComponent={ItemSeparator}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={handleRefresh}
              tintColor={theme.colors.lime[900]}
              colors={[theme.colors.lime[700]]}
            />
          }
          renderItem={({ item: meal }) => <MealCard meal={meal} />}
        />
      </HomeProvider>
    </View>
  );
}
