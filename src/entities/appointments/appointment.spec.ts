import { expect, test } from 'vitest'
import { Appointment } from './appointment'
import { getValidDate } from '../../tests/utils/get-valid-date'

test('create and appointment', () => {
    const startsAt = getValidDate('2023-04-14')
    const endsAt = getValidDate('2023-04-13')

    const appointment = new Appointment({
        customer: 'John Doe',
        startsAt,
        endsAt

    })

    expect(appointment).toBeInstanceOf(Appointment)
    expect(appointment.customer).toEqual('John Doe')
})


    test('Cannot create an appointment with the end date before start date', () => {
        const startsAt = getValidDate('2023-04-14')
        const endsAt = getValidDate('2023-04-13')

        expect(() => {
            return new Appointment({
                customer: 'John Doe',
                startsAt: startsAt,
                endsAt: endsAt
        
            })
        }).toThrow()

    test('Cannot create an appointment with the start date before start date', () => {
        const startsAt = new Date()
        const endsAt = new Date()
         
        startsAt.setDate(startsAt.getDate() - 1)
        endsAt.setDate(endsAt.getDate() - 1)
    
        expect(() => {
            return new Appointment({
                customer: 'John Doe',
                startsAt: startsAt,
                endsAt: endsAt
        
            })
        }).toThrow()
    })
})