import Entity from '@/core/shared/Entity'
import CreateProductDto from '../dtos/CreateProduct.dto'
import StringValidator from '@/core/shared/StringValidator'

export default class Product extends Entity {
    private _name: string
    private _description: string
    private _price: string
    private readonly _createdAt: Date = new Date()
    private _updatedAt: Date = new Date()

    constructor({ name, description, price }: CreateProductDto, id?: string) {
        super(id)
        this._name = new StringValidator(name).input
        this._description = new StringValidator(description).input
        this._price = price
    }

    static create(props: CreateProductDto, id?: string): Product {
        return new Product(props, id)
    }

    get name(): string {
        return this._name
    }

    get description(): string {
        return this._description
    }

    get price(): string {
        return this._price
    }

    get createdAt(): Date {
        return this._createdAt
    }

    get updatedAt(): Date {
        return this._updatedAt
    }
}
