import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Param,
  Req,
  Patch,
  Delete,
  Inject,
  Put,
} from '@nestjs/common';

import { Request } from 'express';
import { AddNewRequestUseCase, IAddNewRequestUseCase } from '@/app/use-cases';

@Controller()
export class WebhookController {
  constructor(
    @Inject(AddNewRequestUseCase)
    private readonly addNewRequestUseCase: IAddNewRequestUseCase,
  ) {}

  @Post(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async post(
    @Body() data: any,
    @Param('id') id: string,
    @Req() req: Request,
  ): Promise<void> {
    await this.addNewRequestUseCase.execute({
      body: JSON.stringify(data),
      headers: JSON.stringify(req.headers),
      method: 'POST',
      webhookId: id,
    });
  }

  @Put(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async put(
    @Body() data: any,
    @Param('id') id: string,
    @Req() req: Request,
  ): Promise<void> {
    await this.addNewRequestUseCase.execute({
      body: JSON.stringify(data),
      headers: JSON.stringify(req.headers),
      method: 'PUT',
      webhookId: id,
    });
  }

  @Patch(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async patch(
    @Param('id') id: string,
    @Req() req: Request,
    @Body() data?: any,
  ): Promise<void> {
    await this.addNewRequestUseCase.execute({
      body: JSON.stringify(data),
      headers: JSON.stringify(req.headers),
      method: 'PATCH',
      webhookId: id,
    });
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(
    @Param('id') id: string,
    @Req() req: Request,
    @Body() data?: any,
  ): Promise<void> {
    await this.addNewRequestUseCase.execute({
      body: JSON.stringify(data),
      headers: JSON.stringify(req.headers),
      method: 'DELETE',
      webhookId: id,
    });
  }
}
