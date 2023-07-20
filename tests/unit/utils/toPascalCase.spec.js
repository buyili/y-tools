import { toPascalCase } from '@/utils/index.js'
describe('Utils:toPascalCase', () => {

  it('snakeCase to pascalCase', () => {
    expect(toPascalCase("userName")).toBe('UserName')
  })
})
