import { DateVO, UUID } from '@Domain/value-objects';
import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Param,
  Req,
} from '@nestjs/common';

import { WebhookEventsGateway } from '@Infra/events-gateway';
import { BadRequestException } from '@App/exceptions';

@Controller('webhook')
export class WebhookController {
  constructor(private readonly webhookEventsGateway: WebhookEventsGateway) {}

  @Post(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async send(
    @Body() data: any,
    @Param('id') id: string,
    @Req() req: any,
  ): Promise<void> {
    try {
      await this.webhookEventsGateway.wss.emit(id, {
        body: JSON.stringify(data),
        headers: JSON.stringify(req.headers),
        time: DateVO.now().value,
        id: UUID.generate().value,
      });
    } catch (error: any) {
      throw new BadRequestException(
        error?.message ?? 'Error to send websocket message',
        error,
      );
    }
  }
}
