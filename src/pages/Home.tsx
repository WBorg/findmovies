import { Center, Text, Button } from 'native-base'
import { useState } from 'react'
import { FlatList } from 'react-native'
import api from '../services/api'

export function Home() {
  const [movies, setMovies] = useState([])

  async function handleFindMovies() {
    const response = await api.get('peça')
    const data = await response.data

    setMovies(data.results)
  }

  return (
    <Center flex={1} backgroundColor="gray.700">
      <Text color="white" fontSize="2xl">
        Find Movies
      </Text>
      <Button marginTop="41px" onPress={handleFindMovies}>
        <Text>Pesquisar filmes</Text>
      </Button>

      <FlatList
        data={movies}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <Text color="white">{item.title}</Text>}
      />
    </Center>
  )
}
