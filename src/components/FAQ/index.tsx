'use client'

import React from 'react'
import * as Accordion from '@radix-ui/react-accordion'
import { ChevronDownIcon } from '@heroicons/react/24/outline'

interface Props {
    className?: string
    children?: React.ReactNode
    value?: string
}

const FAQ = () => (
    <Accordion.Root
        className="w-full rounded-md shadow-md shadow-black/5"
        type="single"
        defaultValue="item-1"
        collapsible
    >
        <AccordionItem value="item-1">
            <AccordionTrigger>Is it accessible?</AccordionTrigger>
            <AccordionContent>Yes. It adheres to the WAI-ARIA design pattern.</AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2">
            <AccordionTrigger>Is it unstyled?</AccordionTrigger>
            <AccordionContent>
                Yes. It&apos;s unstyled by default, giving you freedom over the look and feel.
            </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3">
            <AccordionTrigger>Can it be animated?</AccordionTrigger>
            <AccordionContent>Yes! You can animate the Accordion with CSS or JavaScript.</AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-4">
            <AccordionTrigger>Lorem</AccordionTrigger>
            <AccordionContent>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet quod repudiandae odit maiores suscipit
                laudantium nemo enim fuga iure asperiores!.
            </AccordionContent>
        </AccordionItem>
    </Accordion.Root>
)

const AccordionItem = ({ children, value }: Props) => (
    <Accordion.Item value={value ?? ''} className="border-b last:border-0">
        {children}
    </Accordion.Item>
)

const AccordionTrigger = ({ children }: Props) => (
    <Accordion.Trigger className="flex items-center justify-between w-full p-4">
        <span>{children}</span>
        <ChevronDownIcon className="w-5 h-5 text-mauve10" />
    </Accordion.Trigger>
)

const AccordionContent = ({ children }: Props) => <Accordion.Content className="p-4">{children}</Accordion.Content>

export default FAQ
