import { Controller, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { CommunicationService } from '../secondary-adapters/communication.service';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JWT_ACCESS_TOKEN } from '../../../constants/constants';
import { Observable } from 'rxjs';
import { AuthGuard } from '../../auth-module/application/data/guards/auth.guard';
import { AuthenticatedUser } from '../../../shared-module/application/decorators/authenticated-user.decorator';
import { AuthenticatedAccountResponse } from '../../auth-module/application/data/responses/authenticated-account.response';
import { CommunicationTokenResponse } from '../application/data/responses/communication-token.response';

@ApiTags('Communication')
@Controller('communication')
export class CommunicationController {
  constructor(private readonly communicationService: CommunicationService) {}

  @ApiOperation({})
  @ApiOkResponse({ type: CommunicationTokenResponse })
  @ApiBearerAuth(JWT_ACCESS_TOKEN)
  @UseGuards(AuthGuard)
  @Post('token')
  @HttpCode(HttpStatus.OK)
  issueToken(@AuthenticatedUser() account: AuthenticatedAccountResponse): Observable<CommunicationTokenResponse> {
    return this.communicationService.getCommunicationToken(account);
  }
}
