import columnsJSON from '../../mocks/columns.json'
import tasksJSON from '../../mocks/tasks.json'
import usersJSON from '../../mocks/users.json'
import { vi } from 'vitest'

// В данном случае мы эмулируем файл src/services.
vi.mock('@/services', () => {
  return {
    columnsService: {
      fetchColumns: vi.fn(async () => {
        return await JSON.parse(JSON.stringify(columnsJSON))
      }),
      createColumn: vi.fn(async () => ({ id: 6})),
      updateColumns: vi.fn(),
      deleteColumns: vi.fn()
    },
    tasksService: {
      fetchTasks: vi.fn(async () => JSON.parse(JSON.stringify(tasksJSON)))
    },
    userService: {
      fetchUsers: vi.fn(async () => {
        return await JSON.parse(JSON.stringify(usersJSON))
      })
    }
  }
})