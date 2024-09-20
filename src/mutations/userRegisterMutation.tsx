import { useMutation } from '@tanstack/react-query'
import { postUser, NewUser } from '@/apis'

export function useUserRegisterMutation() {
  const { mutateAsync } = useMutation({
    mutationFn: (newUser: NewUser) => {
      return postUser(newUser)
    },
  })

  return { mutateAsync }
}
