import { useQuery } from '@tanstack/react-query'
import { fetchUser, User } from '@/apis'

export function useUserQuery() {
  const initialData: User = {
    id: '',
    name: '',
  }
  const {
    isLoading,
    data = initialData,
    error,
  } = useQuery({
    queryKey: ['user'],
    queryFn: async (): Promise<User> => {
      return fetchUser()
    },
  })

  return { isLoading, error, data }
}
