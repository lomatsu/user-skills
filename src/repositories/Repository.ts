export interface IRepository<T> {
	getAll(): Promise<T[]>
	getById(id: number): Promise<T>
	create(data: T): Promise<T>
	update(data: Partial<T>): Promise<T>
	delete(id: number): Promise<boolean>
}