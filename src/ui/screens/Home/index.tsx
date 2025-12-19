import { WelcomeModal } from '@ui/components/WelcomeModal';
import { FlatList, RefreshControl, StatusBar, View } from 'react-native';
import { styles } from './styles';
import { Header } from './components/Header';
import { theme } from '@ui/styles/theme';
import { EmptyState } from './components/EmptyState';
import { MealCard } from './components/MealCard';
import { ItemSeparator } from './components/ItemSeparator';
import { FullScreenLoader } from './components/FullScreenLoader';
import { useHomeController } from './useHomeController';
import { HomeProvider } from './context/HomeProvider';
import { Fab } from './components/Fab';

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
      <StatusBar barStyle="dark-content" animated translucent />
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

      {meals.length > 0 && <Fab />}
    </View>
  );
}
