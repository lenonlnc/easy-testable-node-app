import { it, expect } from 'vitest'
import { getValidDate } from './get-valid-date'

it('Increases date within one year', () => {
    const year = new Date().getFullYear()
    expect(getValidDate(`${year}-04-27`).getFullYear()).toEqual(2024)
})