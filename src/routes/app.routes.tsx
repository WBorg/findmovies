import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { Home } from './../pages/Home'
import { Favorites } from './../pages/Favorites'
import { InfoMovies } from './../pages/InfoMovies'

const { Navigator, Screen } = createNativeStackNavigator()

export function AppRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="home" component={Home} />

      <Screen name="favorites" component={Favorites} />

      <Screen name="infomovies" component={InfoMovies} />
    </Navigator>
  )
}
