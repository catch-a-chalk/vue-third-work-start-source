import { it, afterEach, describe, beforeEach, expect } from 'vitest'
import '@/stores/__tests__/mockServices'
// Т.к. vi.mock всплывает на самый верх файла, у него нет доступа к глобальным переменным
// Поэтому важно делать импорт до использования основными файлами
import { createPinia, setActivePinia } from 'pinia'
import { useColumnsStore } from '@/stores'

describe('columns store', () => {
	let columnsStore
	beforeEach(async () => {
		// Определяем Pinia
		setActivePinia(createPinia())
		columnsStore = useColumnsStore()
		await columnsStore.fetchColumns()
	})
	it('should have initial columns', async () => {
		// Количество загруженных колонок должно соответствовать количеству в нашем файле columns.json
		expect(columnsStore.columns.length).toBe(5)
	})
  it('should add a new column', async () => {
    await columnsStore.addColumn({ title: 'Новая колонка' })
    const columnsLength = columnsStore.columns.length
    // Проверяем, что кол-во колонок увеличилось на одну
    expect(columnsLength).toBe(6)
    // id новой колонки должно быть 6
    expect(columnsStore.columns[columnsLength - 1].id).toBe(6)
  })
  it('should update column', async () => {
    const newTitle = 'Наша новая колонка'
    await columnsStore.updateColumn({ id: 1, title: newTitle })
    // Проверяем, что у нас все еще 6 элементов
    expect(columnsStore.columns.length).toBe(5)
    // Проверяем, что изменилось название первой колонки
    expect(columnsStore.columns[0].title).toBe(newTitle)
  })
  it('should delete column', async () => {
    await columnsStore.deleteColumn(5)
    // Проверяем, что количество уменьшилось на одну
    expect(columnsStore.columns.length).toBe(4)
    // Проверяем, что колонки с id = 5 не существует
    expect(columnsStore.columns.find(column => column.id == 5)).toBeUndefined()
  })
})