import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { FilesService } from './files.service';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post('uploadFiles')
  @UseInterceptors(
    FilesInterceptor('files' /*, 10, {
      storage: diskStorage({
        destination: './catFiles', 
        filename: (req, file, callback)=>{
          const unique = Date.now() + '-' + Math.round(Math.random()*1e9)
          const ext = extname(file.originalname)
          callback(null, `${unique}${ext}`)
        }
      })
    }*/)
  )
  async uploadFiles(
    @UploadedFiles() files: Express.Multer.File[], 
    @Body() createFileDto: CreateFileDto
  ){
    return await this.filesService.createMany(files, createFileDto)
  }

  @Get()
  findAll() {
    return this.filesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.filesService.findOne(+id);
  }

  @Patch(':id/approve')
  async approveFile(@Param('id') id: string){
    return this.filesService.approve(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.filesService.remove(+id);
  }
}
