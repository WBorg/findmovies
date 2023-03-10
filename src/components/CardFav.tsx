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
import { MaterialIcons } from '@expo/vector-icons'

export type MovieProps = {
  id: string
  overview: string
  poster_path: string
  title: string
  backdrop_path: string
}

type Props = {
  movieProps: MovieProps
  onPressDelete: () => void
}

export function CardFav({ movieProps, onPressDelete }: Props) {
  return (
    <Box flexDirection="row" padding="4px">
      <Box>
        <Image
          source={{
            uri: `https://image.tmdb.org/t/p/w500//${movieProps.poster_path}`
          }}
          width="140px"
          height="200px"
          resizeMode="cover"
          rounded="4px"
          alt="Capa do filme"
        />
        <Box flexDirection="row" justifyContent="center" my={1}>
          <Button bg="transparent" onPress={onPressDelete}>
            <MaterialIcons name="delete" size={32} color="red" />
          </Button>
        </Box>
      </Box>

      <Box
        ml={2}
        flex={1}
        // height="100%"
        overflow="hidden"
        // borderColor="red.900"
        // borderWidth={2}
      >
        <Heading
          alignSelf="center"
          color="white"
          fontFamily="heading"
          fontSize="lg"
          mb={4}
        >
          {movieProps.title}
        </Heading>
        <Box h="210px" w="full">
          <Text color="white" fontSize="xs">
            {movieProps.overview}
          </Text>
        </Box>
      </Box>
    </Box>
  )
}
