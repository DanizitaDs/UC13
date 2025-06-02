import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
@Entity('produtos')
export class Produto {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({type:"varchar",length:50,nullable: false})
    nome: string;

    @Column({type:"text", nullable: false})
    descricao: string;

    @Column({type:"decimal",precision:6,scale:2,nullable: false})
    preco: number;

    constructor(nome: string,descricao: string,preco: number){
        this.nome = nome;
        this.descricao = descricao;
        this.preco = preco;
    }
}