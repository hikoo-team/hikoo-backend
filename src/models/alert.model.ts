import { ApiProperty } from "@nestjs/swagger";

export class Alerts {
    @ApiProperty()
    permitId: number;
  
    @ApiProperty()
    permitName: string;
  
    @ApiProperty()
    location: string;
    
    @ApiProperty()
    radius: number;

    @ApiProperty()
    alertLevelId: number;

    @ApiProperty()
    alertLevel: string;

    @ApiProperty()
    eventTypeId: number;

    @ApiProperty()
    eventType: string;

    @ApiProperty()
    eventInfo: string;

    @ApiProperty()
    eventTime: string;

    @ApiProperty()
    ttl: number;
    
    @ApiProperty()
    stationId: number;
  
    @ApiProperty()
    stationName: string;

    constructor(permitId: number, permitName: string, 
        location: string, radius: number, 
        alertLevelId: number, alertLevel: string, 
        eventTypeId: number, eventType: string, 
        eventInfo: string, eventTime: string, ttl: number, 
        stationId: number, stationName: string) 
        {
            this.permitId = permitId;
            this.permitName = permitName;
            this.location = location;
            this.radius = radius;
            this.alertLevelId = alertLevelId;
            this.alertLevel = alertLevel;
            this.eventTypeId = eventTypeId;
            this.eventType = eventType;
            this.eventInfo = eventInfo;
            this.eventTime = eventTime;
            this.ttl = ttl;
            this.stationId = stationId;
            this.stationName = stationName;
        }
}

export class CreateAlert {
    @ApiProperty()
    readonly permitId: number;

    @ApiProperty()
    readonly location: string;
    
    @ApiProperty()
    readonly radius: number;

    @ApiProperty()
    readonly alertLevelId: number;

    @ApiProperty()
    readonly eventTypeId: number;

    @ApiProperty()
    readonly eventInfo: string;

    @ApiProperty()
    readonly eventTime: string;

    @ApiProperty()
    readonly ttl: number;
    
    @ApiProperty()
    readonly stationId: number;

    @ApiProperty( {required: false} )
    readonly originEventId: number;
}