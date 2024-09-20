import * as yup from 'yup'
import { suggestive as jaSuggestive } from 'yup-locale-ja'

yup.setLocale(jaSuggestive)

export const userRegisterSchema = yup.object().shape({
  name: yup
    .string()
    .max(5, 'The name must be at most five character long.')
    .required('The name must be at least one character long.'),
})

export type UserRegisterParams = yup.InferType<typeof userRegisterSchema>

export const userRegisterDefaultValues: UserRegisterParams = {
  name: '',
}
