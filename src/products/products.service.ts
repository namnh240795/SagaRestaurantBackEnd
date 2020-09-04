import { CreateProductSizeDto } from './dtos/create-product-size.dto';
import { CreateProductColorDto } from './dtos/create-product-color.dto';
import { strings } from 'src/strings';
import { CreateProductTypeDto } from './dtos/create-product-type.dto';
import { Injectable } from '@nestjs/common';
import FIREBASE_STORAGE_DB from 'src/firebase';

@Injectable()
export class ProductsService {
  private productTypes = [];
  private productSizes = [];
  private productColors = [];

  constructor() {
    this.getProductTypes();
    this.getProductColors();
    this.getProductSizes();
  }

  async createProductType(createProductTypeDto: CreateProductTypeDto) {
    const productTypesRef = FIREBASE_STORAGE_DB.collection('product_types');

    const result = await productTypesRef.add(createProductTypeDto);

    const newItem = await productTypesRef.doc(result.id).get();

    this.productTypes.push({ id: result.id, ...newItem.data() });

    return { data: strings.product.createProductTypeSuccess };
  }

  async removeProductType(id: string) {
    const productTypeRef = FIREBASE_STORAGE_DB.collection('product_types').doc(
      id,
    );
    const productType = await productTypeRef.get();
    if (!productType.exists) {
      return { message: strings.product.productTypeNotFound };
    }

    await productTypeRef.delete();
    return { data: strings.product.removeProductTypeSuccess };
  }

  async createProductColor(createProductColor: CreateProductColorDto) {
    const productColorsRef = FIREBASE_STORAGE_DB.collection('product_colors');

    const result = await productColorsRef.add(createProductColor);

    const newItem = await productColorsRef.doc(result.id).get();

    this.productColors.push({ id: result.id, ...newItem.data() });

    return { data: strings.product.createProductColorSuccess };
  }

  async createProductSize(createProductSizeDto: CreateProductSizeDto) {
    const productSizesRef = FIREBASE_STORAGE_DB.collection('product_sizes');

    const result = await productSizesRef.add(createProductSizeDto);

    const newItem = await productSizesRef.doc(result.id).get();

    this.productSizes.push({ id: result.id, ...newItem.data() });
    return { data: strings.product.createProductSizeSuccess };
  }

  getTypes() {
    return { data: { list: this.productTypes } };
  }

  getSizes() {
    return { data: { list: this.productSizes } };
  }

  getColors() {
    return { data: { list: this.productColors } };
  }

  async getProductColors() {
    const result = await FIREBASE_STORAGE_DB.collection('product_colors').get();
    this.productColors = result.docs.map(productColor => {
      const productColorInfo = productColor.data();
      return { id: productColor.id, ...productColorInfo };
    });
  }

  async getProductSizes() {
    const result = await FIREBASE_STORAGE_DB.collection('product_sizes').get();
    this.productSizes = result.docs.map(productSize => {
      const productSizeInfo = productSize.data();
      return { id: productSize.id, ...productSizeInfo };
    });
  }

  async getProductTypes() {
    const result = await FIREBASE_STORAGE_DB.collection('product_types').get();
    this.productTypes = result.docs.map(productType => {
      const productTypeInfo = productType.data();
      return { id: productType.id, ...productTypeInfo };
    });
  }
}
