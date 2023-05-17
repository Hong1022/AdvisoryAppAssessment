import { Column, Entity, OneToMany } from "typeorm";
import { AppBaseEntity } from "./base/base.entity";
import { ListingEntity } from "./listing.entity";
import { UserRoleTypeEnum } from "../enum/user.enum";

@Entity("users")
export class UserEntity extends AppBaseEntity {
  @Column("varchar")
  name: string;

  @Column("varchar")
  email: string;

  @Column("enum", { enum: UserRoleTypeEnum })
  roleType: UserRoleTypeEnum;

  @Column("datetime")
  emailVerifiedAt: Date;

  @Column("varchar")
  password: string;

  @Column("varchar", { nullable: true })
  rememberToken: string;

  @OneToMany(() => ListingEntity, (listings) => listings.user)
  listings: ListingEntity[];
}
