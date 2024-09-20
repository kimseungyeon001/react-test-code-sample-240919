import { Template } from '@/components/common/Template'
import { useUserQuery } from '@/queries/userQuery'

export function UserPage() {
  const { isLoading, error, data } = useUserQuery()

  if (isLoading) return <div data-testid="userLoading">...loading</div>
  if (error?.message)
    return <div data-testid="userErrorMessage">{error.message}</div>
  return (
    <Template>
      <div
        className="flex flex-col justify-center items-center h-full"
        data-testid="userPage"
      >
        <div>Hello {data.name}.</div>
      </div>
    </Template>
  )
}
