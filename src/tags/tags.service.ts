import { UpdateTagDto } from './dtos/update-tag.dto';
import { CreateTagDto } from './dtos/create-tag.dto';
import { Tag } from './interfaces/tag.interface';
import { Injectable } from '@nestjs/common';
import FIREBASE_STORAGE_DB from 'src/firebase';
import { doc } from 'prettier';

@Injectable()
export class TagsService {
  async createTag(createTagDto: CreateTagDto) {
    const result = await FIREBASE_STORAGE_DB.collection('tags').add(
      createTagDto,
    );
    return result.id;
  }

  async updateTag(id: string, updateTagDto: UpdateTagDto) {
    const tagRef = FIREBASE_STORAGE_DB.collection('tags').doc(id);
    const tag = await tagRef.get();
    if (!tag.exists) {
      return 'Không tìm thấy nhãn';
    }

    await tagRef.update(updateTagDto);

    return 'Cập nhật nhãn thành công';
  }

  async removeTag(id: string) {
    const tagRef = FIREBASE_STORAGE_DB.collection('tags').doc(id);
    const tag = await tagRef.get();
    if (!tag.exists) {
      return 'Không tìm thấy nhãn';
    }

    await tagRef.delete();
    return 'Xoá nhãn thành công';
  }

  async getTags(): Promise<Tag[]> {
    const result = await FIREBASE_STORAGE_DB.collection('tags').get();
    return result.docs.map(tag => ({ id: tag.id, ...tag.data() }));
  }
}
