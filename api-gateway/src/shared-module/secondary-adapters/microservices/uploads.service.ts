import { Inject, Injectable } from '@nestjs/common';
import { UPLOADS_SERVICE } from '../../../constants/services';
import { ClientProxy } from '@nestjs/microservices';
import { AccountResponse } from '../../../components/users-module/application/data/responses/account.response';
import { Observable } from 'rxjs';
import { AccountInterface } from '../../../components/auth-module/application/data/interfaces/account.interface';

@Injectable()
export class UploadsService {
  constructor(@Inject(UPLOADS_SERVICE) private readonly uploadsService: ClientProxy) {}

  uploadFile(file: Express.Multer.File, account: AccountInterface): Observable<AccountResponse> {
    return this.uploadsService.send('upload_file', {
      file: {
        buffer: file.buffer,
        mimetype: file.mimetype,
        ext: file.originalname.split('.')[1],
      },
      type: 'users',
      accountId: account.id,
    });
  }
}
