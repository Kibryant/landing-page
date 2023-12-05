import AddNewFriend from '@/core/user/services/AddNewFriend'
import { RepositoryUserMongo } from '@/external/database/repository/user/RepositoryUserMongoose'
import { HttpStatusCode } from '@/types/HttpStatusCode'
import { z } from 'zod'

export async function POST(req: Request) {
    try {
        const body = await req.json()
        console.log(body)
        const repositoryUser = new RepositoryUserMongo()
        const addNewFriend = new AddNewFriend(repositoryUser)

        const { id: userIdToAdd, currentUserId } = body
        // notify added user

        // await Promise.all([
        //     pusherServer.trigger(toPusherKey(`user:${idToAdd}:friends`), 'new_friend', user),
        //     pusherServer.trigger(toPusherKey(`user:${session.user.id}:friends`), 'new_friend', friend),
        //     await addNewFriend.exec({
        //         userId:
        //     }),
        // ])
        const result = await addNewFriend.exec({
            userId: currentUserId,
            friendId: userIdToAdd,
        })

        if (!result.success) {
            return new Response('Something went wrong', { status: HttpStatusCode.INTERNAL_SERVER_ERROR })
        }

        return new Response('Friend added', { status: HttpStatusCode.OK, statusText: 'OK' })
    } catch (error) {
        console.log(error)

        if (error instanceof z.ZodError) {
            return new Response('Invalid request payload', { status: 422 })
        }

        return new Response('Invalid request', { status: 400 })
    }
}
