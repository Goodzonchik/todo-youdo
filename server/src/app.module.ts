import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProjectsModule } from './projects/projects.module';

@Module({
  imports: [ConfigModule.forRoot(), ProjectsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
