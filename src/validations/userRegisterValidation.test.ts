import {
  UserRegisterParams,
  userRegisterSchema,
} from './userRegisterValidation'

// NOTE: If you want to validate the validation separately, write the test code as shown below.
describe('createResidentValidation', () => {
  test('When validation is fine.', () => {
    const userRegisterParams: UserRegisterParams = {
      name: 'John',
    }
    expect(() =>
      userRegisterSchema.validateSync(userRegisterParams),
    ).not.toThrow()
  })

  test('Error When no more than 1 character is entered.', () => {
    const userRegisterParams: UserRegisterParams = {
      name: '',
    }
    expect(() => userRegisterSchema.validateSync(userRegisterParams)).toThrow(
      'The name must be at least one character long.',
    )
  })

  test('Error when more than 5 characters are entered.', () => {
    const userRegisterParams: UserRegisterParams = {
      name: 'Johnnnn',
    }
    expect(() => userRegisterSchema.validateSync(userRegisterParams)).toThrow(
      'The name must be at most five character long.',
    )
  })
})
