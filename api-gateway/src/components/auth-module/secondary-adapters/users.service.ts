import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { USERS_SERVICE } from '../../../constants/services';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { AuthTokensResponse } from '../application/data/responses/auth-tokens.response';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { SignUpRequest } from '../application/data/requests/sign-up.request';
import { SignInRequest } from '../application/data/requests/sign-in.request';
import { RefreshTokensRequest } from '../application/data/requests/refresh-tokens.request';
import { CommunicationService } from './communication.service';
import { SignedUpAccountResponse } from '../application/data/types/signed-up-account.response';
import { SetupProfileRequest } from '../application/data/requests/setup-profile.request';
import { AccountResponse } from '../../users-module/application/data/responses/account.response';
import { AccountInterface } from '../application/data/interfaces/account.interface';

@Injectable()
export class UsersService {
  constructor(
    @Inject(USERS_SERVICE) private readonly usersService: ClientProxy,
    private readonly communicationService: CommunicationService,
  ) {}

  private handleError(error: any): Observable<never> {
    return throwError(() => new RpcException(error.response));
  }

  signUp(body: SignUpRequest): Observable<AuthTokensResponse> {
    return this.usersService.send<SignedUpAccountResponse>('sign_up', body).pipe(
      tap((response) => this.communicationService.sendAccountCreatedTrigger(response.accountId)),
      map(({ accessToken, refreshToken }) => new AuthTokensResponse(accessToken, refreshToken)),
      catchError((error) => this.handleError(error)),
    );
  }

  signIn(body: SignInRequest): Observable<AuthTokensResponse> {
    return this.usersService.send<AuthTokensResponse>('sign_in', body).pipe(catchError((error) => this.handleError(error)));
  }

  verifyAccessToken(token: string): Observable<AccountInterface> {
    return this.usersService.send<AccountInterface>('verify_access_token', { token }).pipe(catchError((error) => this.handleError(error)));
  }

  refreshTokens(body: RefreshTokensRequest): Observable<AuthTokensResponse> {
    if (!body.authorization) throw new ForbiddenException();
    const [, token] = body.authorization.split(' ');
    return this.usersService.send<AuthTokensResponse>('refresh_tokens', { token }).pipe(catchError((error) => this.handleError(error)));
  }

  setupProfile(body: SetupProfileRequest, account: AccountResponse): Observable<AccountResponse> {
    return this.usersService
      .send<AccountResponse>('setup_profile', { ...body, accountId: account.id })
      .pipe(catchError((error) => this.handleError(error)));
  }
}
