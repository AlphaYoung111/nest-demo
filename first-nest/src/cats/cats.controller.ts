
import { Body, Controller, Get, Header, HttpCode, HttpStatus, Param, Post, Put, Query, Redirect, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express'
import UpdateCatsDto from './cats.dto';
interface Cats {
  name: string,
  type: string,
  id: string,
  price: number,
  owner: string
}
@Controller('cats')
export class CatsController {
  @Get()
  @Header('Cache-Control', 'none')
  findAll(@Req() request: Request): string {
    return 'There are all cats'
  }
  @Post()
  @HttpCode(200)
  create(@Body() cat: Cats): Cats {
    return cat
  }
  @Get('test/docs')
  @Redirect('https://www.baidu.com', 404)
  getDocs(@Query('url') url: string): string {
    return url
  }
  @Get('test/:id')
  getCatsById(@Param('id') id: string): string {
    return `you find cat which id is ${id}`
  }
  @Get('test/promise')
  async getPromise(@Body() mycat: Cats): Promise<Cats> {
    return Promise.resolve(mycat)
  }
  @Put('test/updatedto')
  async testDto(@Body() updatecat: UpdateCatsDto): Promise<string> {
    return `you just update cat name to ${updatecat.name}`
  }
  @Get('rewrite')
  testRewrite(@Res() res: Response): void {
    res.status(HttpStatus.CREATED).json([])
  }
}
