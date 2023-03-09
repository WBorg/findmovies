import { Center, Text, Button } from 'native-base'
import { useState } from 'react'
import { FlatList } from 'react-native'
import api from '../services/api'
import firestore from '@react-native-firebase/firestore'

import { Card } from '../components/Card'

export function Home() {
  const [movies, setMovies] = useState([])
  const [input, setInput] = useState('')

  async function handleFindMovies() {
    const response = await api.get('Avatar')
    const data = await response.data

    setMovies(data.results)
  }

  async function handleAddMovie() {
    firestore()
      .collection('favoritos')
      .add({ title: 'aa' })
      .then(() => {
        console.log('Filme adicionado com sucesso')
      })
      .catch(error => console.error(error))
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
        renderItem={({ item }) => (
          <Card title={item.title} onPress={handleAddMovie} />
        )}
      />
    </Center>
  )
}
