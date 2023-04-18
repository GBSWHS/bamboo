import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "postsEntity" })
export default class PostsEntity {
  @PrimaryGeneratedColumn("uuid")
  uuid: string;

  @Column({ name: "num", type: "int", nullable: false, unique: true })
  num: number;

  @Column({ name: "title", type: "varchar", length: 24, nullable: false })
  title: string;

  @Column({ name: "desc", type: "text" })
  desc: string;

  @Column({ name: "category", type: "varchar", length: 8, nullable: false })
  category: string;

  @Column({ name: "password", type: "text", nullable: false })
  password: string;

  @Column({ name: "visible", type: "bool", default: true })
  visible: boolean;

  @Column({ name: "report_count", type: "int", default: 0 })
  report_count: number;

  @Column({ name: "remoteAddress", type: "text" })
  remoteAddress: string;

  @Column({ name: "session", type: "varchar", length: 32 })
  remoteSession: string;

  @CreateDateColumn({ name: "createdAt" })
  createdAt: Date;
}
