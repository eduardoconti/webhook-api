import { DateVO, UUID } from '@/domain/value-objects';
import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Param,
  Req,
} from '@nestjs/common';

import { WebhookEventsGateway } from './webhook-events.gateway';

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
    await this.webhookEventsGateway.wss.emit(id, {
      body: JSON.stringify(data),
      headers: JSON.stringify(req.headers),
      time: DateVO.now().value,
      id: UUID.generate().value,
    });
  }
}
