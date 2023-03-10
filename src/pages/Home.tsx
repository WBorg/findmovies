import { Center, Text, Button, HStack, Box } from 'native-base'
import { SafeAreaView } from 'react-native-safe-area-context'

import { Alert } from 'react-native'
import { useEffect, useState } from 'react'
import { FlatList } from 'react-native'
import api from '../services/api'
import firestore from '@react-native-firebase/firestore'

import { Card } from '../components/Card'
import { Input } from '../components/Input'
import { Separator } from '../components/Separator'

import { MovieProps } from '../components/Card'

export function Home() {
  const [movies, setMovies] = useState([])
  const [search, setSearch] = useState('')
  const [favorite, setFavorite] = useState(true)

  async function handleFindMovies() {
    if (search === '') return Alert.alert('Digite o nome do filme desejado')
    const response = await api.get(`${search}`)
    const data = await response.data

    setMovies(data.results)
  }

  async function handleAddMovie(movieData: MovieProps) {
    firestore()
      .collection('favoritos')
      .doc(`${movieData.id}`)
      .get()
      .then(response => {
        if (!response.exists) {
          firestore()
            .collection('favoritos')
            .doc(`${movieData.id}`)
            .set({
              backdrop_path: `${movieData.backdrop_path}`,
              overview: `${movieData.overview}`,
              poster_path: `${movieData.poster_path}`,
              title: `${movieData.title}`,
              favorite
            })
            .then(() =>
              Alert.alert('Filme adicionado aos favoritos com sucesso!')
            )
            .catch(error => console.error('Erro: ', error))
        } else Alert.alert('Esse filme já está cadastrado nos favoritos')
      })
      .catch(error => console.error('Erro : ', error))
  }

  // useEffect(() => {
  //   if (search !== '') {
  //     api
  //       .get(`${search}`)
  //       .then(response => response.data)
  //       .then(data => setMovies(data.results))
  //   }
  // }, [movies])

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Center backgroundColor="gray.700">
        <Text color="white" fontSize="2xl">
          Find Movies
        </Text>
        <HStack space={1}>
          <Input onChangeText={setSearch} />
          <Button
            onPress={handleFindMovies}
            h={14}
            bgColor="green.500"
            fontFamily="body"
          >
            <Text color="white">Pesquisar</Text>
          </Button>
        </HStack>
      </Center>
      <Box flex={1} backgroundColor="gray.700" w="100%">
        <FlatList
          data={movies}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <Card
              movieProps={item}
              pressFavorite={() => handleAddMovie(item)}
            />
          )}
          ItemSeparatorComponent={() => <Separator />}
        />
      </Box>
    </SafeAreaView>
  )
}
