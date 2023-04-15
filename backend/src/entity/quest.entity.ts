import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "QuestEntity" })
export default class QuestEntity {
  @PrimaryGeneratedColumn("increment")
  increment: number;

  @Column({ name: "quest", type: "text", nullable: false })
  quest: string;

  @Column({ name: "answer", type: "text", nullable: false })
  answer: string;

  @CreateDateColumn({ name: "createdAt" })
  createdAt: string;
}