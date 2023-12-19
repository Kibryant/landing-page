import { pgDocker } from '@/external/database/connections/postgressql/prisma/pgsql_docker'
import { NewAccountCreator } from '@/components/NewAccountCreator'
import { Section } from '@/components/Section'
import { AccountList } from '@/components/AccountList'

export default async function AccountsPage() {
    const accounts = await pgDocker.account.findMany({
        select: { id: true, name: true, createdAt: true },
        orderBy: { name: 'asc' },
    })

    return (
        <>
            <main className="flex flex-col  justify-center items-center">
                <Section className="space-y-6">
                    <NewAccountCreator />
                    <div className="flex flex-col gap-4 justify-center items-center w-full">
                        <AccountList accounts={accounts} />
                    </div>
                </Section>
            </main>
        </>
    )
}
