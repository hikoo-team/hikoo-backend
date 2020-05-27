import { Controller, Request, Logger, Param, Get, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiResponse, ApiQuery, ApiBearerAuth } from '@nestjs/swagger';
import { PermitService } from './permit.service';
import { DataTypeRole } from '../../share/models/permit.model';
import { HikeViewDto } from 'src/share/dto/hike.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiBearerAuth()
@ApiTags('permit')
@Controller('permit')
export class PermitController {
  constructor(private srv: PermitService, private _logger: Logger) {
    _logger.setContext(PermitController.name);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOperation({ summary: 'Find this user hiking plans' })
  @ApiQuery({ name: 'type', enum: DataTypeRole, required: false })
  @ApiQuery({ name: 'start', type: 'number', required: false })
  @ApiQuery({ name: 'count', type: 'number', required: false })
  @ApiResponse({ status: 200, type: HikeViewDto, isArray: true, description: 'successful operation' })
  async getPermitsByUser(
    @Request() req,
    @Query('type') dataType: DataTypeRole,
    @Query('start') start: number,
    @Query('count') count: number,
  ): Promise<HikeViewDto[]> {
    const userId = req.user.userId;

    this._logger.debug(`Get Permit userId: ${userId}, dataType: ${dataType}, start: ${start}, count: ${count}`);
    start = (start !== null ? start : 0)
    count = (count !== null ? count : 10)
    // count need more than 0

    return await this.srv.getByHikerId(userId, start, count)
    // Todo: filter by dataType
  }

  @UseGuards(JwtAuthGuard)
  @Get(':hikeId')
  @ApiOperation({ summary: 'Get hiking plan detail by id' })
  @ApiParam({ name: 'hikeId', type: 'number' })
  @ApiQuery({ name: 'type', enum: DataTypeRole, required: true })
  @ApiResponse({ status: 200, type: HikeViewDto, isArray: false, description: 'successful operation' })
  async getPermit(
    @Request() req,
    @Param('hikeId') hikeId: number,
    @Param('type') dataType: DataTypeRole
  ): Promise<HikeViewDto> {
    const userId = req.user.userId;

    this._logger.debug(`Get Permit userId: ${userId}, dataType: ${dataType}, hikeId: ${hikeId}`);

    // Todo: filter by dataType
    return await this.srv.FindOneByIds(userId, hikeId);
  }

}
