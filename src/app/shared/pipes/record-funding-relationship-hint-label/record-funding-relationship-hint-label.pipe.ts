import { Pipe, PipeTransform } from '@angular/core'
import {
  FundingRelationships,
  FundingRelationshipsHintsLabels,
} from 'src/app/types/record-funding.endpoint'

@Pipe({
  name: 'recordFundingRelationshipHintLabel',
})
export class RecordFundingRelationshipHintLabelPipe implements PipeTransform {
  transform(value: FundingRelationships): unknown {
    return FundingRelationshipsHintsLabels[value]
  }
}
