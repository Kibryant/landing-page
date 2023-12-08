export default interface UpdateTaskDto {
    _id?: string
    id: string
    task?: string
    description?: string
    dayToFinishTheTask?: Date
    howMuchTimeIsLeft?: Date
}
