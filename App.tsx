import { NativeBaseProvider } from 'native-base'
import { NavigationContainer } from '@react-navigation/native'

import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold
} from '@expo-google-fonts/roboto'

import { THEME } from './src/theme'
import { Loading } from './src/components/Loading'
import { AppRoutes } from './src/routes/app.routes'
export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold })

  return (
    <NativeBaseProvider theme={THEME}>
      <NavigationContainer>
        {fontsLoaded ? <AppRoutes /> : <Loading />}
      </NavigationContainer>
    </NativeBaseProvider>
  )
}
