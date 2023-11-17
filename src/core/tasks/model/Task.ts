export default interface Task {
    _id?: string
    userId?: string
    id: string
    task: string
    dayToFinishTheTask: Date
    description: string
    howMuchTimeIsLeft: Date
}
