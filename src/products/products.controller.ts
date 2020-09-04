import { CreateProductDto } from './dtos/create-product.dto';
import { CreateProductSizeDto } from './dtos/create-product-size.dto';
import { CreateProductTypeDto } from './dtos/create-product-type.dto';
import { ProductsService } from './products.service';
import { ApiTags } from '@nestjs/swagger';
import { Controller, Post, Body, Get, Delete, Param } from '@nestjs/common';
import { CreateProductColorDto } from './dtos/create-product-color.dto';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Post()
  async createProduct(@Body() createProductDto: CreateProductDto) {
    return this.productsService.createProduct(createProductDto);
  }

  @Get()
  async getProduct() {
    return this.productsService.getProducts();
  }

  @Post('/types')
  async createProductType(@Body() createProductTypeDto: CreateProductTypeDto) {
    return this.productsService.createProductType(createProductTypeDto);
  }

  @Get('/types')
  async getProductTypes() {
    return this.productsService.getTypes();
  }

  @Delete('/types/:id')
  async deleteProductTypes(@Param('id') id: string) {
    return this.productsService.removeProductType(id);
  }

  @Post('/types/colors')
  async createProductColor(
    @Body() createProductColorDto: CreateProductColorDto,
  ) {
    return this.productsService.createProductColor(createProductColorDto);
  }

  @Get('/types/colors')
  async getProductColors() {
    return this.productsService.getColors();
  }

  @Post('/types/sizes')
  async createProductSize(@Body() createProductSizeDto: CreateProductSizeDto) {
    return this.productsService.createProductSize(createProductSizeDto);
  }

  @Get('/types/sizes')
  async getProductSizes() {
    return this.productsService.getSizes();
  }
}
