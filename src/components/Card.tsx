import { Button, IButtonProps, Text, HStack } from 'native-base'

type Props = IButtonProps & {
  title: string
}

export function Card({ title, ...rest }: Props) {
  return (
    <HStack>
      <Text>{title}</Text>
      <Button {...rest}>Cadastrar</Button>
    </HStack>
  )
}
