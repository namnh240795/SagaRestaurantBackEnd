import { UpdateRoleDto } from './dtos/update-role.dto';
import { Role } from './interfaces/role.interface';
import { CreateRoleDto } from './dtos/create-role.dto';
import { Injectable } from '@nestjs/common';
import FIREBASE_STORAGE_DB from 'src/firebase';
import { strings } from 'src/strings';

@Injectable()
export class RolesService {
  async create(createRoleDto: CreateRoleDto) {
    const result = await FIREBASE_STORAGE_DB.collection('roles').add(
      createRoleDto,
    );
    return result.id;
  }

  async search(): Promise<Role[]> {
    const result = await FIREBASE_STORAGE_DB.collection('roles')
      .limit(10)
      .get();

    return result.docs.map(role => {
      const roleInfo = role.data();
      return { id: role.id, ...roleInfo };
    });
  }

  async updateRole(id: string, updateRoleDto: UpdateRoleDto) {
    const roleRef = FIREBASE_STORAGE_DB.collection('roles').doc(id);
    const role = await roleRef.get();
    if (!role.exists) {
      return strings.role.notFound;
    }

    await roleRef.update(updateRoleDto);

    return strings.role.updateSuccess;
  }

  async removeRole(id: string) {
    const roleRef = FIREBASE_STORAGE_DB.collection('roles').doc(id);
    const role = await roleRef.get();
    if (!role.exists) {
      return strings.role.notFound;
    }

    await roleRef.delete();
    return strings.role.deleteSuccess;
  }
}
