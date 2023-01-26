import { BaseEntity, Column, Entity, ObjectIdColumn } from 'typeorm';

@Entity()
export class Users extends BaseEntity {
  @ObjectIdColumn()
  id: number;

  @Column()
  socialID: string;
}
