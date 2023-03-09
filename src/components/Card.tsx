import {
  Box,
  Button,
  Heading,
  HStack,
  Icon,
  Image,
  Text,
  VStack
} from 'native-base'
import { AntDesign } from '@expo/vector-icons'

export type MovieProps = {
  id: string
  overview: string
  poster_path: string
  title: string
  backdrop_path: string
}

type Props = {
  movieProps: MovieProps
  pressFavorite: () => void
}

export function Card({ movieProps, pressFavorite }: Props) {
  return (
    <HStack py={4} justifyContent="space-between" h={250} alignItems="center">
      <Image
        source={{
          uri: `https://image.tmdb.org/t/p/w500//${movieProps.poster_path}`
        }}
        width={150}
        height={200}
        resizeMode="cover"
      />
      <VStack ml={4} bgColor="orange.800" h={200} w={200}>
        <Heading color="white" fontFamily="heading" fontSize="lg" mb={4}>
          {movieProps.title}
        </Heading>
        <Box>
          <Button
            w={12}
            rounded="full"
            _hover={{ backgroundColor: 'green.500' }}
          >
            <Icon as={AntDesign} name="infocirlceo" size={8} color="black" />
          </Button>
          <Button
            w={12}
            rounded="full"
            onPress={pressFavorite}
            _pressed={{ backgroundColor: 'green.500' }}
          >
            <Icon as={AntDesign} name="staro" size={8} color="black" />
          </Button>
        </Box>
      </VStack>
    </HStack>
  )
}
