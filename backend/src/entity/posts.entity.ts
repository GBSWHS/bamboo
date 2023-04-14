import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "postsEntity" })
export default class PostsEntity {
  @PrimaryGeneratedColumn("uuid")
  uuid: string;

  @Column({ name: "title", type: "varchar", length: 24, nullable: false })
  title: string;

  @Column({ name: "desc", type: "text" })
  desc: string;

  @Column({ name: "password", type: "text", nullable: false })
  password: string;

  @Column({ name: "visible", type: "bool", default: true })
  visible: boolean;

  @Column({ name: "report_count", type: "int", default: 0 })
  report_count: number;

  @Column({ name: "remoteAddress", type: "text" })
  remoteAddress: string;
}
