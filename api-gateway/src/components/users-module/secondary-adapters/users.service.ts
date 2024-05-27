import { Inject, Injectable } from '@nestjs/common';
import { USERS_SERVICE } from '../../../constants/services';
import { ClientProxy } from '@nestjs/microservices';
import { ErrorHandlingFromMicroserviceService } from '../../../shared-module/secondary-adapters/microservices/error-handling-from-microservice.service';
import { GetUserRequest } from '../application/data/requests/get-user.request';
import { catchError, Observable } from 'rxjs';
import { AccountResponse } from '../application/data/responses/account.response';
import { AddConnectionRequest } from '../application/data/requests/add-connection.request';
import { ConnectionResponse } from '../application/data/responses/connection.response';
import { GetUserConnectionRequest } from '../application/data/requests/get-user-connection.request';
import { AddInterestsRequest } from '../application/data/requests/add-interests.request';
import { GetUserInterestRequest } from '../application/data/requests/get-user-interest.request';
import { InterestResponse } from '../application/data/responses/interest.response';
import { SearchUsersRequest } from '../application/data/requests/search-users.request';
import { AccountInterface } from '../../auth-module/application/data/interfaces/account.interface';
import { AccountFullResponse } from '../application/data/responses/account-full.response';

@Injectable()
export class UsersService {
  constructor(
    @Inject(USERS_SERVICE) private readonly usersService: ClientProxy,
    private readonly errorHandlingFromMicroserviceService: ErrorHandlingFromMicroserviceService,
  ) {}

  getUser({ userId }: GetUserRequest): Observable<AccountResponse> {
    return this.usersService
      .send('get_account_by_id', { id: userId })
      .pipe(catchError((error) => this.errorHandlingFromMicroserviceService.handleError(error)));
  }

  addConnection(body: AddConnectionRequest, account: AccountResponse): Observable<ConnectionResponse[]> {
    return this.usersService
      .send<ConnectionResponse[]>('add_user_connection', { ...body, accountId: account.id })
      .pipe(catchError((error) => this.errorHandlingFromMicroserviceService.handleError(error)));
  }

  deleteConnection(body: GetUserConnectionRequest): Observable<ConnectionResponse[]> {
    return this.usersService
      .send<ConnectionResponse[]>('remove_user_connection', body)
      .pipe(catchError((error) => this.errorHandlingFromMicroserviceService.handleError(error)));
  }

  getUserConnections({ userId }: GetUserRequest): Observable<ConnectionResponse[]> {
    return this.usersService
      .send<ConnectionResponse[]>('get_user_connections', { id: userId })
      .pipe(catchError((error) => this.errorHandlingFromMicroserviceService.handleError(error)));
  }

  addInterest(body: AddInterestsRequest, account: AccountResponse): Observable<InterestResponse[]> {
    return this.usersService
      .send<InterestResponse[]>('add_user_interests', { ...body, accountId: account.id })
      .pipe(catchError((error) => this.errorHandlingFromMicroserviceService.handleError(error)));
  }

  deleteInterest(body: GetUserInterestRequest): Observable<InterestResponse[]> {
    return this.usersService
      .send<InterestResponse[]>('remove_user_interest', body)
      .pipe(catchError((error) => this.errorHandlingFromMicroserviceService.handleError(error)));
  }

  getUserInterests({ userId }: GetUserRequest): Observable<InterestResponse[]> {
    return this.usersService
      .send<InterestResponse[]>('get_user_interests', { id: userId })
      .pipe(catchError((error) => this.errorHandlingFromMicroserviceService.handleError(error)));
  }

  searchUsers(body: SearchUsersRequest, account: AccountResponse): Observable<AccountResponse[]> {
    return this.usersService
      .send('search_users', { ...body, accountId: account.id })
      .pipe(catchError((error) => this.errorHandlingFromMicroserviceService.handleError(error)));
  }

  uploadFile(file: Express.Multer.File, account: AccountInterface): Observable<AccountResponse> {
    return this.usersService
      .send('upload_profile_image', {
        file: { buffer: file.buffer, mimetype: file.mimetype, ext: file.originalname.split('.')[1] },
        accountId: account.id,
        type: 'users',
      })
      .pipe(catchError((error) => this.errorHandlingFromMicroserviceService.handleError(error)));
  }

  getProfile({ userId }: GetUserRequest): Observable<AccountFullResponse> {
    return this.usersService
      .send('get_profile_by_id', { id: userId })
      .pipe(catchError((error) => this.errorHandlingFromMicroserviceService.handleError(error)));
  }
}
