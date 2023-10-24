import Link from 'next/link'
import { pgDocker } from '@/external/database/connections/postgressql/prisma/pgsql_docker'
import NewAccountCreator from '@/components/NewAccountCreator'

export default async function AccountsPage() {
    const accounts = await pgDocker.account.findMany({
        select: { id: true, name: true },
        orderBy: { name: 'asc' },
    })

    return (
        <main className="flex justify-center items-center">
            <NewAccountCreator />
            {accounts.map((account) => (
                <Link href={`/accounts/${account.id}`} key={account.id}>
                    {account.name}
                </Link>
            ))}
        </main>
    )
}
