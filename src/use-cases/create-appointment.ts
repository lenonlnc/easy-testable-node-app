import { Appointment } from "../entities/appointments/appointment"
import { AppointmentsRepository } from "../repositories/appointment-repositories"

interface CreateAppointmentRequest{
    customer: string
    startsAt: Date
    endsAt: Date
}

type CreateAppointmentResponse = Appointment

export class CreateAppointment{
    constructor(
        private appointmentRepository: AppointmentsRepository
    ){}

    async execute({ 
        customer, 
        startsAt, 
        endsAt 
    }: CreateAppointmentRequest): Promise<CreateAppointmentResponse>{

        const overlappingAppointment = await this.appointmentRepository.findOverlappingAppointment(
            startsAt,
            endsAt
        )

        if(overlappingAppointment){
            throw new Error('Another appointment is overlapping this appointment dates')
        }

        const appointment = new Appointment({
            customer, 
            startsAt, 
            endsAt 
        })
        await this.appointmentRepository.create(appointment)
        return appointment

    }
}