export default interface CreateTaskDto {
    id: string
    task: string
    description: string
    dayToFinishTheTask: Date
    howMuchTimeIsLeft: Date
}
