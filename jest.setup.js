import '@testing-library/jest-dom/extend-expect'
import 'whatwg-fetch'
import 'esm'
import { server } from '@/mocks/server'

// Configure the client to use the mock server
beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())
