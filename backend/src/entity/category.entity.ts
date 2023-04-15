import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "CategoryEntity" })
export default class CategoryEntity {
  @PrimaryGeneratedColumn("uuid")
  uuid: string;

  @Column({ name: "name", type: "varchar", unique: true, length: 8, nullable: false })
  name: string;

  @Column({ name: "desc", type: "text", nullable: true })
  desc?: string | undefined;

  @Column({ name: "status", type: "bool", nullable: false, default: true })
  status: boolean;

  @Column({ name: "post_count", type: "int", default: 0 })
  post_count: number;

  @CreateDateColumn({ name: "createdAt" })
  createdAt: Date;
}