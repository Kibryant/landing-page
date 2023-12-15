// components/TaskItem.js
import React from 'react'
import Task from '@/core/task/entity/Task'
import { Button } from '@/components/ui/button'
import { format } from 'date-fns'

interface TaskItemProps {
    task: Task
}

const TaskItem = ({ task }: TaskItemProps) => {
    return (
        <li className="flex flex-col">
            <Button className="text-secondary-foreground bg-transparent">{task.task}</Button>
            <span className="text-xs text-gray-500">created at: {format(new Date(task.createdAt), 'hh:mm a')}</span>
        </li>
    )
}

export default TaskItem
