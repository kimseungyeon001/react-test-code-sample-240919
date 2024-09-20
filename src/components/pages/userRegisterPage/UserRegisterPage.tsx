import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useState } from 'react'
import { ErrorMessage } from '@hookform/error-message'
import { useNavigate } from 'react-router-dom'
import { useUserRegisterMutation } from '@/mutations/userRegisterMutation'
import { Template } from '@/components/common/Template'
import { NewUser } from '@/apis'
import {
  userRegisterDefaultValues,
  userRegisterSchema,
} from '@/validations/userRegisterValidation'

export function UserRegisterPage() {
  const [mutationErrorMessage, setMutationErrorMessage] = useState('')
  const {
    formState: { errors, isValid },
    register,
    handleSubmit,
  } = useForm({
    defaultValues: userRegisterDefaultValues,
    resolver: yupResolver(userRegisterSchema),
    mode: 'onChange',
    reValidateMode: 'onChange',
  })
  const navigate = useNavigate()
  const { mutateAsync } = useUserRegisterMutation()

  const onSubmit = async (data: NewUser) => {
    try {
      await mutateAsync(data)
      navigate('/')
    } catch (error: unknown) {
      setMutationErrorMessage((error as Error).message)
    }
  }

  return (
    <Template>
      <div
        className="flex flex-col justify-center items-center h-full"
        data-testid="userRegisterPage"
      >
        <form
          className="flex flex-col gap-2 w-[350px]"
          onSubmit={handleSubmit((data) => {
            onSubmit(data)
          })}
        >
          <div className="flex flex-col">
            <input
              className="p-1 border rounded"
              {...register('name')}
              type="text"
              name="name"
              data-testid="nameInput"
            />
            <div className="text-red-500 text-xs">
              <ErrorMessage errors={errors} name="name" />
            </div>
          </div>
          <button
            className="border bg-black rounded text-white p-1 disabled:bg-gray-300"
            disabled={!isValid}
            type="submit"
            data-testid="registerButton"
          >
            register
          </button>
        </form>
        <div data-testid="userRegisterMutationErrorMessage">
          {mutationErrorMessage}
        </div>
      </div>
    </Template>
  )
}
