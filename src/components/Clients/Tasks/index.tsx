'use client'
import Task from '@/core/task/entity/Task'
import TaskItem from './TaskItem'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import * as Dialog from '@radix-ui/react-dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { XIcon } from 'lucide-react'
import * as RadioGroup from '@radix-ui/react-radio-group'
import * as Popover from '@radix-ui/react-popover'

interface TaskListProps {
    tasks: Task[]
}

const TaskList = ({ tasks }: TaskListProps) => {
    if (!tasks || tasks.length === 0) {
        return <p>No tasks available.</p>
    }

    return (
        <div className="flex justify-center w-full items-center">
            <Card className="p-4 w-full max-w-5xl">
                <CardHeader>
                    <CardTitle> Your Tasks </CardTitle>
                    <CardDescription>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates,{' '}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {tasks.length === 0 ? (
                        <div className="text-center">
                            <p className="text-2xl">No tasks available.</p>
                        </div>
                    ) : (
                        tasks.map((task) => (
                            <div key={task.id} className="flex justify-between items-center p-2 border-b">
                                <Dialog.Root>
                                    <Popover.Root>
                                        <TaskItem task={task} />
                                        <div>
                                            <Popover.Trigger>
                                                <Button className="text-secondary-foreground">Details</Button>
                                            </Popover.Trigger>

                                            <Dialog.Trigger asChild>
                                                <Button variant="ghost">Update</Button>
                                            </Dialog.Trigger>

                                            <Button variant="destructive">Delete</Button>
                                        </div>

                                        <Popover.Portal>
                                            <Popover.Content
                                                className="bg-[#020817] border p-5 rounded-lg"
                                                sideOffset={10}
                                            >
                                                <div className="flex flex-col gap-2.5">
                                                    <p className="text-mauve12 text-[15px] leading-[19px] font-medium mb-2.5">
                                                        Dimensions
                                                    </p>
                                                    <div className="flex gap-5 items-center">
                                                        <span className="text-[13px] text-violet11 w-[75px]">
                                                            Width
                                                        </span>
                                                        <span>lorem</span>
                                                    </div>
                                                    <div className="flex gap-5 items-center">
                                                        <span className="text-[13px] text-violet11 w-[75px]">
                                                            Max. width
                                                        </span>
                                                        <span>lorem ipsum dolor </span>
                                                    </div>
                                                    <div className="flex gap-5 items-center">
                                                        <span className="text-[13px] text-violet11 w-[75px]">
                                                            Height
                                                        </span>
                                                        <span>lorem</span>
                                                    </div>
                                                    <div className="flex gap-5 items-center">
                                                        <span className="text-[13px] text-violet11 w-[75px]">
                                                            Max. height
                                                        </span>
                                                        <span>lorem</span>
                                                    </div>
                                                </div>
                                                <Popover.Close
                                                    className="rounded-full h-[25px] w-[25px] inline-flex items-center justify-center  absolute top-[5px] right-[5px] hover:bg-destructive outline-none cursor-default"
                                                    aria-label="Close"
                                                >
                                                    <XIcon />
                                                </Popover.Close>
                                                <Popover.Arrow className="fill-white" />
                                            </Popover.Content>
                                        </Popover.Portal>

                                        <Dialog.Portal>
                                            <Dialog.Overlay />
                                            <Card className="fixed top-[50%] left-[55%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] p-4 rounded-lg ">
                                                <Dialog.Content>
                                                    <CardHeader>
                                                        <Dialog.Title className="m-0 text-[17px] font-medium">
                                                            Edit task
                                                        </Dialog.Title>
                                                        <Dialog.Description className=" mt-[10px] mb-5 text-[15px] leading-normal">
                                                            Make changes to your task here. Click save when you&apos;re
                                                            done.
                                                        </Dialog.Description>
                                                    </CardHeader>
                                                    <CardContent>
                                                        <fieldset className="mb-[15px] flex items-center gap-5">
                                                            <Label
                                                                className=" w-[90px] text-left text-[15px]"
                                                                htmlFor="name"
                                                            >
                                                                Name
                                                            </Label>
                                                            <Input
                                                                className="inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none "
                                                                id="name"
                                                                defaultValue={task.task}
                                                            />
                                                        </fieldset>
                                                        <fieldset className="mb-[15px] flex items-center gap-5">
                                                            <Label
                                                                className=" w-[90px] text-left text-[15px]"
                                                                htmlFor="content"
                                                            >
                                                                Content
                                                            </Label>
                                                            <Input
                                                                className="  inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none  outline-none "
                                                                id="content"
                                                                defaultValue={task.content}
                                                            />
                                                        </fieldset>
                                                        <fieldset className="mb-[15px] flex flex-col gap-5">
                                                            <Label
                                                                className=" w-[90px] text-left text-[15px]"
                                                                htmlFor="status"
                                                            >
                                                                Status
                                                            </Label>
                                                            <RadioGroup.Root
                                                                className="flex flex-col gap-2.5"
                                                                defaultValue={task.isDone ? 'yes' : 'no'}
                                                                aria-label="View density"
                                                            >
                                                                <div className="flex items-center">
                                                                    <RadioGroup.Item
                                                                        className="bg-secondary w-[25px] h-[25px] rounded-full hover:border focus:bg-secondary-foreground outline-none cursor-default"
                                                                        value="no"
                                                                        id="r1"
                                                                    >
                                                                        <RadioGroup.Indicator className="flex items-center justify-center w-full h-full relative after:content-[''] after:block after:w-[11px] after:h-[11px] after:rounded-[50%]" />
                                                                    </RadioGroup.Item>
                                                                    <label
                                                                        className="text-secondary-foreground text-[15px] leading-none pl-[15px]"
                                                                        htmlFor="r1"
                                                                    >
                                                                        No
                                                                    </label>
                                                                </div>
                                                                <div className="flex items-center">
                                                                    <RadioGroup.Item
                                                                        className="bg-secondary w-[25px] h-[25px] rounded-full hover:border focus:bg-secondary-foreground outline-none cursor-default"
                                                                        value="yes"
                                                                        id="r2"
                                                                    >
                                                                        <RadioGroup.Indicator className="flex items-center justify-center w-full h-full relative after:content-[''] after:block after:w-[11px] after:h-[11px] after:rounded-[50%]" />
                                                                    </RadioGroup.Item>
                                                                    <label
                                                                        className="text-secondary-foreground text-[15px] leading-none pl-[15px]"
                                                                        htmlFor="r2"
                                                                    >
                                                                        Yes
                                                                    </label>
                                                                </div>
                                                            </RadioGroup.Root>
                                                        </fieldset>
                                                        <div className="mt-[25px] flex justify-end">
                                                            <Dialog.Close asChild>
                                                                <Button className="text-secondary-foreground inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none focus:outline-none">
                                                                    Save changes
                                                                </Button>
                                                            </Dialog.Close>
                                                        </div>
                                                        <Dialog.Close asChild>
                                                            <button
                                                                className=" absolute top-[10px] right-[10px] inline-flex h-8 w-8 appearance-none items-center justify-center rounded-full bg-destructive focus:outline-none"
                                                                aria-label="Close"
                                                            >
                                                                <XIcon className="text-destructive-foreground w-5 h-5" />
                                                            </button>
                                                        </Dialog.Close>
                                                    </CardContent>
                                                </Dialog.Content>
                                            </Card>
                                        </Dialog.Portal>
                                    </Popover.Root>
                                </Dialog.Root>
                            </div>
                        ))
                    )}
                </CardContent>
            </Card>
        </div>
    )
}

export default TaskList
