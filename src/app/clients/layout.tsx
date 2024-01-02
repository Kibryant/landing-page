import { View } from '@/components/Clients/View'
import { getUserCookies } from '@/utils/getUserCookies'

export default function ClientLayout({ children }: { children: React.ReactNode }) {
    const user = getUserCookies()

    return <View username={user?.username ?? ''}>{children}</View>
}
