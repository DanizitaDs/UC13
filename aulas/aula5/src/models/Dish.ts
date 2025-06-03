import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { OrderItem } from "./OrderItem";

@Entity('dishes')
export class Dish {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 150 })
  private _name: string;

  @Column("text")
  private _description: string;

  @Column({ type: "decimal", precision: 6, scale: 2 })
  private _price: number;

  @Column({ default: true })
  private _available: boolean;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.dish)
  orderItems!: OrderItem[];


    /**
     * Getter name
     * @return {string}
     */
	public get name(): string {
		return this._name;
	}

    /**
     * Getter description
     * @return {string}
     */
	public get description(): string {
		return this._description;
	}

    /**
     * Getter price
     * @return {number}
     */
	public get price(): number {
		return this._price;
	}

    /**
     * Getter available
     * @return {boolean}
     */
	public get available(): boolean {
		return this._available;
	}

    /**
     * Setter name
     * @param {string} value
     */
	public set name(value: string) {
		this._name = value;
	}

    /**
     * Setter description
     * @param {string} value
     */
	public set description(value: string) {
		this._description = value;
	}

    /**
     * Setter price
     * @param {number} value
     */
	public set price(value: number) {
		this._price = value;
	}

    /**
     * Setter available
     * @param {boolean} value
     */
	public set available(value: boolean) {
		this._available = value;
	}


  constructor(_name:string,_description:string,_price:number,_available: boolean){
    this._name = _name;
    this._description = _description;
    this._price = _price;
    this._available = _available;
}
}