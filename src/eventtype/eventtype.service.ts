import { Injectable } from '@nestjs/common';

@Injectable()
export class EventtypeService {
    getEventTypes() {
        return [
            {id:1, name:'Animal', description:'Wild/stray animal spotted nearby the trail', defalert:1},
            {id:2, name:'Item Found', description:'Item dropped on trail', defalert:1},
            {id:3, name:'Blocked Route', description:'Anything that blocking the trail route', defalert:2},
            {id:4, name:'SOS', description:'SOS', defalert:4}
        ]
    }}
