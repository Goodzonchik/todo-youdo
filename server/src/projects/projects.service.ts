import { Injectable } from '@nestjs/common';

@Injectable()
export class ProjectsService {
  getIndex() {
    return { message: 'ok' };
  }
}
