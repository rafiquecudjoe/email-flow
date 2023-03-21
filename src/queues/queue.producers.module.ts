import { BullModule } from "@nestjs/bull";
import { Module } from "@nestjs/common";

@Module({
    imports: [
        BullModule.registerQueue({name:'sendEmail'})
    ],
    exports: [
        BullModule.registerQueue({ name: 'sendEmail' })
    ]
})

export class QueueProducersModule {}