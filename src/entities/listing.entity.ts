import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { AppBaseEntity } from './base/base.entity';
import { UserEntity } from './user.entity';

@Entity('listings')
export class ListingEntity extends AppBaseEntity {
  @Column('bigint', { unsigned: true })
  userId: number;
  
  @Column('varchar')
  name: string;

  @Column('double', { precision: 20, scale: 6 })
  latitude: number;

  @Column('double', { precision: 20, scale: 6 })
  longitude: number;

  @ManyToOne(() => UserEntity, (user) => user.listings)
  @JoinColumn({ name: 'userId' })
  user: UserEntity;
}
