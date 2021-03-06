import {
  Controller,
  Request,
  Param,
  Post,
  Logger,
  UseGuards,
  HttpCode,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { ApiTags, ApiResponse, ApiOperation, ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { HikooResponse, HikooBadReqResponse } from '../../share/dto/generic.dto';
import { CheckInService } from './checkin.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiBearerAuth()
@ApiTags('checkin')
@Controller('checkout')
export class CheckOutController {
  constructor(private srv: CheckInService, private _logger: Logger) {
    _logger.setContext(CheckOutController.name);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':hikeId')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Send hiker check-out to backend server' })
  @ApiParam({ name: 'hikeId', type: 'number' })
  @ApiResponse({ status: HttpStatus.OK, type: HikooResponse, description: 'successful operation' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, type: HikooResponse, description: 'Error: Unauthorized' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: HikooBadReqResponse, description: 'Invalid hikeId supplied' })
  async sendCheckOut(
    @Request() req,
    @Param('hikeId') hikeId: number,
  ): Promise<HikooResponse> {
    const userId = req.user.userId;
    this._logger.debug(`@Post CheckOut, hiker=[${userId}], hike=[${hikeId}]`);
    const result = await this.srv.sendCheckOut(userId, hikeId);
    this._logger.debug(`@Post CheckOut Result, hiker=[${userId}], result=[${(result).success}]`);

    if (!result.success) {
      throw new HttpException(
        { success: false, errorMessage: result.errorMessage },
        HttpStatus.BAD_REQUEST,
      );
    }
    return result;
  }
}
