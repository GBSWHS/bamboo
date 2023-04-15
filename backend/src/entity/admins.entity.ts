import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "AdminsEntity" })
export default class AdminsEntity {
  @PrimaryGeneratedColumn("uuid")
  uuid: string;

  @Column({ name: "creater", type: "varchar", length: 5, nullable: false })
  creater: string;

  @Column({ name: "password", type: "text", nullable: false })
  password: string;

  @CreateDateColumn({ name: "createdAt" })
  createdAt: string;
}