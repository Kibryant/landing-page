import Link from 'next/link'
import { pgDocker } from '@/external/database/connections/postgressql/prisma/pgsql_docker'
import { NewAccountCreator } from '@/components/NewAccountCreator'
import { Section } from '@/components/Section'
import Header from '@/components/Header'

export default async function AccountsPage() {
    const accounts = await pgDocker.account.findMany({
        select: { id: true, name: true },
        orderBy: { name: 'asc' },
    })

    return (
        <>
            <Header showContent={false} />
            <main className="flex flex-col  justify-center items-center">
                <Section className="space-y-6">
                    <NewAccountCreator />
                    <div className="flex flex-col gap-4 justify-center items-center w-full">
                        <h1 className="text-3xl">List of accounts!</h1>
                        <div className="flex flex-col gap-3 justify-center items-center">
                            {accounts.map((account) => (
                                <Link
                                    className="text-xl border-b border-b-primary rounded-lg"
                                    href={`/accounts/${account.id}`}
                                    key={account.id}
                                >
                                    {account.name}
                                </Link>
                            ))}
                        </div>
                    </div>
                </Section>
            </main>
        </>
    )
}
