import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Platform } from 'react-native'

import { Home } from './../pages/Home'
import { Favorites } from './../pages/Favorites'
import { MaterialIcons } from '@expo/vector-icons'

const { Navigator, Screen } = createBottomTabNavigator()

export function AppRoutes() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: 'green.500',
        tabBarInactiveTintColor: 'gray.300',
        tabBarLabelPosition: 'beside-icon',
        tabBarStyle: {
          height: 52,
          paddingVertical: Platform.OS === 'ios' ? 20 : 0
        }
      }}
    >
      <Screen
        name="home"
        component={Home}
        options={{
          tabBarIcon: ({ size, color }) => (
            <MaterialIcons name="home" size={size} color={color} />
          )
        }}
      />

      <Screen
        name="favorites"
        component={Favorites}
        options={{
          tabBarIcon: ({ size, color }) => (
            <MaterialIcons name="favorite" size={size} color={color} />
          )
        }}
      />
    </Navigator>
  )
}
