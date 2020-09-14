import { RolesGuard } from 'src/role.guard';
import { CreateProductDto } from './dtos/create-product.dto';
import { CreateProductSizeDto } from './dtos/create-product-size.dto';
import { CreateProductTypeDto } from './dtos/create-product-type.dto';
import { ProductsService } from './products.service';
import { ApiTags } from '@nestjs/swagger';
import {
  Controller,
  Post,
  Body,
  Get,
  Delete,
  Param,
  UseGuards,
} from '@nestjs/common';
import { CreateProductColorDto } from './dtos/create-product-color.dto';
import { JwtAuthGuard } from 'src/jwt-auth.guard';
import { Roles } from 'src/Roles.decorator';

@ApiTags('products')
@Controller('products')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Roles('MANAGER')
  @Post()
  async createProduct(@Body() createProductDto: CreateProductDto) {
    return this.productsService.createProduct(createProductDto);
  }

  @Roles('MANAGER')
  @Get()
  async getProduct() {
    return this.productsService.getProducts();
  }

  @Roles('MANAGER')
  @Delete(':id')
  async removeProduct(@Param('id') id: string) {
    return this.productsService.removeProduct(id);
  }

  @Roles('MANAGER')
  @Post('/types')
  async createProductType(@Body() createProductTypeDto: CreateProductTypeDto) {
    return this.productsService.createProductType(createProductTypeDto);
  }

  @Roles('MANAGER')
  @Get('/types')
  async getProductTypes() {
    return this.productsService.getTypes();
  }

  @Roles('MANAGER')
  @Delete('/types/:id')
  async deleteProductTypes(@Param('id') id: string) {
    return this.productsService.removeProductType(id);
  }

  @Roles('MANAGER')
  @Post('/types/colors')
  async createProductColor(
    @Body() createProductColorDto: CreateProductColorDto,
  ) {
    return this.productsService.createProductColor(createProductColorDto);
  }

  @Roles('MANAGER')
  @Get('/types/colors')
  async getProductColors() {
    return this.productsService.getColors();
  }

  @Roles('MANAGER')
  @Post('/types/sizes')
  async createProductSize(@Body() createProductSizeDto: CreateProductSizeDto) {
    return this.productsService.createProductSize(createProductSizeDto);
  }

  @Roles('MANAGER')
  @Get('/types/sizes')
  async getProductSizes() {
    return this.productsService.getSizes();
  }
}
