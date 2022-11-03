import { TYPES } from '@Main/dependency-injection';

import { WinstonLogger } from '@/infra/logger';

export const provideWebhookLogger = {
  provide: WinstonLogger,
  useFactory: () => {
    return new WinstonLogger('WebhookModule');
  },
};
