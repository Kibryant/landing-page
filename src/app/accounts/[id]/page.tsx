import { Section } from '@/components/Section'
import NewWorkSessionRow from '@/components/WorkSessionFormRow'
import WorkSessionRow from '@/components/WorkSessionRow'
import { pgDocker } from '@/external/database/connections/postgressql/prisma/pgsql_docker'
import React from 'react'

type Props = {
    params: {
        id: string
    }
}

const AccountDetailPage: React.FC<Props> = async ({ params }) => {
    const account = await pgDocker.account.findUniqueOrThrow({
        select: {
            id: true,
            name: true,
            workSessions: {
                select: {
                    id: true,
                    accountId: true,
                    description: true,
                    startsOn: true,
                    hours: true,
                },
                orderBy: { startsOn: 'desc' },
            },
        },
        where: { id: params.id },
    })

    return (
        <Section className="p-8 border shadow rounded-lg">
            <h1 className="text-lg font-bold">{account.name}</h1>
            <h2 className="text-base font-semibold text-primary mb-8">TODO</h2>

            <div>
                <div>
                    <div className="flex">
                        <div className="flex-1 w-[100px]">Date</div>
                        <div className="flex-[3_3_0%]">Description</div>
                        <div className="flex-1 text-right w-[140px]">Hours</div>
                        <div className="flex-1" />
                    </div>
                </div>
                <div>
                    <NewWorkSessionRow account={account} />
                    {account.workSessions.map((session) => (
                        <WorkSessionRow key={session.id} session={session} />
                    ))}
                </div>
            </div>
        </Section>
    )
}

export default AccountDetailPage
