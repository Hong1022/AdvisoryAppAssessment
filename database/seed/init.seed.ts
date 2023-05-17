import { UserEntity } from '../../src/entities/user.entity';
import { ListingEntity } from '../../src/entities/listing.entity';
import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';
import { UserRoleTypeEnum } from '../../src/enum/user.enum';
import moment from 'moment';
import { hashPassword } from '../../src/utils/password.utils';

export default class Init implements Seeder {
  public async run(_factory: Factory, connection: Connection): Promise<any> {
    await connection.transaction(async (transactionManager) => {
      const admin = await transactionManager.getRepository(UserEntity).save({
        name: 'admin',
        email: 'admin@gmail.com',
        password: await hashPassword('test1234'), 
        roleType: UserRoleTypeEnum.a,
        emailVerifiedAt: moment().format('YYYY-MM-DD'),
        rememberToken: ""
      });

      const user = await transactionManager.getRepository(UserEntity).save({
        name: 'Lim',
        email: 'lianhong@gmail.com',
        password: await hashPassword('test1234'), 
        roleType: UserRoleTypeEnum.u,
        emailVerifiedAt: moment().format('YYYY-MM-DD'),
        rememberToken: ""
      });

      const listing1 = await transactionManager.getRepository(ListingEntity).save({
        userId: user.id,
        name: 'Starbucks Mid Valley',
        longitude: 101.67684947186042,
        latitude: 3.1180635630189495,
      });

      const listing2 = await transactionManager.getRepository(ListingEntity).save({
        userId: user.id,
        name: 'BurgerKing Mid Valley',
        longitude: 101.6781691757226,
        latitude: 3.1184636841746016,
      });

      const listing3 = await transactionManager.getRepository(ListingEntity).save({
        userId: user.id,
        name: 'PizzaHut Mid Valley',
        longitude: 101.67661069437719,
        latitude: 3.1167746437307704,
      });

      const listing4 = await transactionManager.getRepository(ListingEntity).save({
        userId: user.id,
        name: 'Sunway Pyramid',
        longitude: 101.60633476685048,
        latitude: 3.0723943859515077,
      });

      const listing5 = await transactionManager.getRepository(ListingEntity).save({
        userId: admin.id,
        name: 'Starbucks Mid Valley',
        longitude: 101.67684947186042,
        latitude: 3.1180635630189495,
      });
    });
  }
}
