import { DefaultLayout } from '@/components/common/DefaultLayout'
import { useUserQuery } from '@/queries/userQuery'
import { User } from '@/apis'

interface UserPagePresenterProps {
  isLoading: boolean
  errorMessage?: string
  data: User
}

export function UserPagePresenter({
  isLoading,
  errorMessage,
  data,
}: UserPagePresenterProps) {
  if (isLoading) return <div data-testid="user-loading">...loading</div>
  if (errorMessage)
    return <div data-testid="user-error-message">{errorMessage}</div>
  return (
    <DefaultLayout>
      <div
        className="flex flex-col justify-center items-center h-full"
        data-testid="user-page"
      >
        <div>Hello {data.name}.</div>
      </div>
    </DefaultLayout>
  )
}

export function UserPage() {
  const { isLoading, error, data } = useUserQuery()

  return (
    <UserPagePresenter
      isLoading={isLoading}
      errorMessage={error?.message}
      data={data}
    />
  )
}
