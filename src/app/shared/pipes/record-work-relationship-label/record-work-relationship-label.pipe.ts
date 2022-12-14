import { Pipe, PipeTransform } from '@angular/core'
import {
  WorkRelationships,
  WorkRelationshipsLabels,
} from 'src/app/types/works.endpoint'

@Pipe({
  name: 'recordWorkRelationshipLabel',
})
export class RecordWorkRelationshipLabelPipe implements PipeTransform {
  transform(value: WorkRelationships): unknown {
    return WorkRelationshipsLabels[value]
  }
}
