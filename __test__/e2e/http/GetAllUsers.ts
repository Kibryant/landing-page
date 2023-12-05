// import GetAllUsersController from '@/adapters/controllers/GetAllUsersController'
// import { GetAllUsers } from '@/core/user/services/GetAllUsers'
// import RepositoryUserMemory from '@/external/memory/RepositoryUserMemory'
// import axios from 'axios'

// jest.mock('axios')

// I comment this for now because i want this code to be tested with the real implementation

// describe('GetAllUsersController', () => {
//     it('should return all users and data', async () => {
//         const mockUsers = [
//             { id: '1', email: 'test1@example.com', username: 'test', password: 'test' },
//             { id: '2', email: 'test2@example.com', username: 'test', password: 'test' },
//         ]
//         const mockData = [
//             { id: '3', email: 'test3@example.com', username: 'test', password: 'test' },
//             { id: '4', email: 'test4@example.com', username: 'test', password: 'test' },
//         ]

//         const repositoryUser = new RepositoryUserMemory()
//         const getAllUsers = new GetAllUsers(repositoryUser) // Substitua isso pela implementação real
//         jest.spyOn(getAllUsers, 'exec').mockResolvedValue(mockUsers)

//         // eslint-disable-next-line @typescript-eslint/ban-ts-comment
//         // @ts-ignore
//         axios.get.mockResolvedValue({ data: mockData })

//         const controller = new GetAllUsersController(axios, getAllUsers)
//         const result = await controller.handle()

//         expect(result).toEqual({ users: mockUsers, data: mockData })
//         expect(axios.get).toHaveBeenCalledWith('/users')
//         expect(getAllUsers.exec).toHaveBeenCalled()
//     })
// })
