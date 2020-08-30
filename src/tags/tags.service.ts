import { UpdateTagDto } from './dtos/update-tag.dto';
import { CreateTagDto } from './dtos/create-tag.dto';
import { Injectable } from '@nestjs/common';
import FIREBASE_STORAGE_DB from 'src/firebase';
import { strings } from 'src/strings';

@Injectable()
export class TagsService {
  async createTag(createTagDto: CreateTagDto) {
    const result = await FIREBASE_STORAGE_DB.collection('tags').add(
      createTagDto,
    );
    return { data: result.id };
  }

  async updateTag(id: string, updateTagDto: UpdateTagDto) {
    const tagRef = FIREBASE_STORAGE_DB.collection('tags').doc(id);
    const tag = await tagRef.get();
    if (!tag.exists) {
      return { message: strings.tag.notFound };
    }

    await tagRef.update(updateTagDto);

    return { data: strings.tag.updateSuccess };
  }

  async removeTag(id: string) {
    const tagRef = FIREBASE_STORAGE_DB.collection('tags').doc(id);
    const tag = await tagRef.get();
    if (!tag.exists) {
      return { message: strings.tag.notFound };
    }

    await tagRef.delete();
    return { data: strings.tag.deleteSuccess };
  }

  async getTags(): Promise<any> {
    const result = await FIREBASE_STORAGE_DB.collection('tags').get();

    return {
      data: {
        list: result.docs.map(tag => {
          const tagInfo = tag.data();
          console.log(tagInfo);
          return { id: tag.id, ...tagInfo };
        }),
      },
    };
  }
}
