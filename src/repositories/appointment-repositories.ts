import { Appointment } from "../entities/appointments/appointment";

export interface AppointmentsRepository{
    create(appointment: Appointment): Promise <void>

    findOverlappingAppointment(startsAt: Date, endsAt: Date): Promise<Appointment | null>
}