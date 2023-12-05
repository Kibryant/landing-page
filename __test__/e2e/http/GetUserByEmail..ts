// import GetUserByEmailController from '@/adapters/controllers/GetUserByEmailController'
// import User from '@/core/user/entity/User'
// import { GetUserByEmail } from '@/core/user/services/GetUserByEmail'
// import RepositoryUserMemory from '@/external/memory/RepositoryUserMemory'
// import { HttpStatusCode } from '@/types/HttpStatusCode'
// import { Response } from '@/types/class/Response'
// import axios from 'axios'
// import MockAdapter from 'axios-mock-adapter'

// describe('GetUserByEmailController', () => {
//     it('should return user and data', async () => {
//         const mockAxios = new MockAdapter(axios)
//         const email = 'test@example.com'
//         const mockUser: Response<User> = {
//             data: {
//                 id: '1',
//                 username: 'test',
//                 email,
//                 password: '123456',
//             },
//             message: 'User found',
//             status: HttpStatusCode.OK,
//         }
//         const mockData = { id: '2', email }

//         const repositoryUser = new RepositoryUserMemory()
//         const getUserByEmail = new GetUserByEmail(repositoryUser)
//         jest.spyOn(getUserByEmail, 'exec').mockResolvedValue(mockUser)

//         mockAxios.onGet('/user', { params: { email } }).reply(200, mockData)

//         const controller = new GetUserByEmailController(axios, getUserByEmail)
//         const result = await controller.handle(email)

//         expect(result).toEqual({ user: mockUser, data: mockData })
//     })
// })
