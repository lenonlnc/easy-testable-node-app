import { describe, expect, it } from "vitest";
import { CreateAppointment } from "./create-appointment";
import { Appointment } from "../entities/appointments/appointment";
import { getValidDate } from "../tests/utils/get-valid-date";
import { InMemoryAppointmentsRepository } from "../repositories/in-memory/in-memory-appointments-repository";

describe('Create Appointment', () => {
    it('should be able to create an appointment', () => {
        const startsAt =  getValidDate('2023-04-20')
        const endsAt = getValidDate('2023-04-22')

        const appointmentsRepository = new InMemoryAppointmentsRepository()
        const createAppointment = new CreateAppointment(appointmentsRepository)

        expect(createAppointment.execute({
            customer: 'John Doe',
            startsAt,
            endsAt
        })).resolves.toBeInstanceOf(Appointment)
    })


    it('should not be able to create an appointment with overlapping dates', async() => {
        const startsAt =  getValidDate('2023-04-20')
        const endsAt = getValidDate('2023-04-25')

        const appointmentsRepository = new InMemoryAppointmentsRepository()
        const createAppointment = new CreateAppointment(appointmentsRepository)

       await expect(createAppointment.execute({
            customer: 'John Doe',
            startsAt,
            endsAt
        }))

        expect(createAppointment.execute({
            customer: 'John Doe',
            startsAt:getValidDate('2023-04-23'),
            endsAt: getValidDate('2023-04-26')
        })).rejects.toBeInstanceOf(Error)

        expect(createAppointment.execute({
            customer: 'John Doe',
            startsAt:getValidDate('2023-04-12'),
            endsAt: getValidDate('2023-04-21')
        })).rejects.toBeInstanceOf(Error)

        expect(createAppointment.execute({
            customer: 'John Doe',
            startsAt:getValidDate('2023-04-08'),
            endsAt: getValidDate('2023-04-27')
        })).rejects.toBeInstanceOf(Error)
    })
})