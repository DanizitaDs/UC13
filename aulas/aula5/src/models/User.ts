import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Order } from "./Order";

@Entity('users')
export class User {

  @PrimaryGeneratedColumn()
   id!: number;

  @Column({ length: 100, nullable: false })
  private _name: string;

  @Column({ unique: true })
  private _email: string;

  @Column({ nullable: false })
  private _password: string;

  @Column({ default: "customer" })
  private _role: string;

  @OneToMany(() => Order, (order) => order.user)
  orders!: Order[];


    /**
     * Getter name
     * @return {string}
     */
	public get name(): string {
		return this._name;
	}

    /**
     * Getter email
     * @return {string}
     */
	public get email(): string {
		return this._email;
	}

    /**
     * Getter password
     * @return {string}
     */
	public get password(): string {
		return this._password;
	}

    /**
     * Getter role
     * @return {string}
     */
	public get role(): string {
		return this._role;
	}

    /**
     * Setter name
     * @param {string} value
     */
	public set name(value: string) {
		this._name = value;
	}

    /**
     * Setter email
     * @param {string} value
     */
	public set email(value: string) {
		this._email = value;
	}

    /**
     * Setter password
     * @param {string} value
     */
	public set password(value: string) {
		this._password = value;
	}

    /**
     * Setter role
     * @param {string} value
     */
	public set role(value: string) {
		this._role = value;
	}

   
  constructor(_name:string,_email:string,_passoword:string, _role: string){
    this._name=_name;
    this._email=_email;
    this._password=_passoword;
    this._role = _role;
}
}