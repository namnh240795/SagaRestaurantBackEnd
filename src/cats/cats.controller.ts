import { UpdateCatDto } from './update-cat.dto';
import { Controller, Get, Post, Param, Body, Put, Delete } from '@nestjs/common';
import { Cat } from './interfaces/cat.interface';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dtos/create-cat.dto';


@Controller('cats')
export class CatsController {
    constructor(private catsService: CatsService) {}


    @Post()
    async create(@Body() createCatDto: CreateCatDto) {
      this.catsService.create(createCatDto);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updateCatDto: UpdateCatDto) {
        return `This action updates a #${id} cat`;
    }

    @Get()
    async findAll(): Promise<Cat[]> {
        return this.catsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id): string {
        return `This action return ${id} cats`;
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return `This action remove ${id} cats`;
    }
}