import { Text, Box, Heading, Button, Icon } from 'native-base'
import { useEffect, useState } from 'react'
import { Alert } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import firestore from '@react-native-firebase/firestore'

import { MaterialCommunityIcons } from '@expo/vector-icons'

import { MovieProps } from '../components/Card'
import { FlatList } from 'react-native'
import { CardFav } from '../components/CardFav'
import { Separator } from '../components/Separator'
import { Loading } from '../components/Loading'

export function Favorites() {
  const [moviesFav, setMoviesFav] = useState([])
  const [done, setDone] = useState(false)
  const [quantityText, setQuantityText] = useState('')
  const [idsToDelete, setIdsToDelete] = useState([])

  function handleDeleteMovie(id: string) {
    firestore().collection('favoritos').doc(`${id}`).delete()
    Alert.alert('Filme removido dos favoritos com sucesso')
    handleQueryFavoritesMovies()
  }
  function showAlertDeleteAll() {
    Alert.alert(
      'Tem certeza que deseja excluír todos os filmes favoritos?',
      '',
      [
        {
          text: 'SIM',
          onPress: () => handleDeleteAllFavorites()
        },
        {
          text: 'NÃO',
          onPress: () => null
        }
      ]
    )
  }
 async function handleDeleteAllFavorites(){
     // Referência para a coleção que deseja excluir os documentos
     const FavoritesRef = firestore().collection('favoritos');
        
     // Obter todos os documentos da coleção
     const querySnapshot = await FavoritesRef.get();
     
     // Excluir todos os documentos em lote
     const batch = firestore().batch();
     querySnapshot.forEach((doc) => {
       batch.delete(doc.ref);
     });
     await batch.commit();
    // handleQueryFavoritesMovies()


    
  }
  function handleQueryFavoritesMovies() {
    const subscribe = firestore()
      .collection('favoritos')
      .onSnapshot(querySnapshot => {
        const data = querySnapshot.docs.map(doc => {
          return {
            id: doc.id,
            ...doc.data()
          }
        }) as MovieProps[]
        setMoviesFav(data)

        setDone(true)
      })
      
    return () => subscribe()
  }
  useEffect(() => {
    if (moviesFav.length === 0 || moviesFav.length > 1) {
      setQuantityText(`filmes adicionados`)
    } else {
      setQuantityText(`filme adicionado`)
    }
  }, [moviesFav])
  useEffect(() => {
    //setDone(false)
    handleQueryFavoritesMovies()
  }, [])
  // useEffect(() => {
    
  //   handleQueryFavoritesMovies()
  // }, [idsToDelete])

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Box bg="gray.700" flex={1} pt={4} px={2}>
        <Box
          flexDirection={'row'}
          justifyContent={'space-between'}
          alignItems="center"
        >
          <Heading color="green.500" fontFamily="heading" fontSize="3xl">
            Meus Favoritos
          </Heading>
          <Button
            rightIcon={
              <Icon
                as={MaterialCommunityIcons}
                name="delete-circle"
                color="red.500"
                size={6}
              />
            }
            variant="outline"
            size={'sm'}
            borderColor={'red.500'}
            onPress={showAlertDeleteAll}
            _pressed={{
              borderColor: 'red.800',
              bg: 'red.500:alpha.20'
            }}
          >
            <Text color={'red.500'}>Deletar todos</Text>
          </Button>
        </Box>

        {done === false ? (
          <Loading />
        ) : (
          <>
            <Heading mt={4} color="white" fontFamily="heading" fontSize="3xl">
              {moviesFav.length} {quantityText}
            </Heading>
            <Box bgColor={'gray.700'} flex={1} pt={6}>
              <FlatList
                data={moviesFav}
                showsVerticalScrollIndicator={false}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                  <CardFav
                    movieProps={item}
                    onPressDelete={() => handleDeleteMovie(item.id)}
                  />
                )}
                ItemSeparatorComponent={() => <Separator />}
              />
            </Box>
          </>
        )}
      </Box>
    </SafeAreaView>
  )
}
