import { Pipe, PipeTransform } from '@angular/core'
import {
  WorksTitleName,
  WorksTitleNameLabel,
} from 'src/app/types/works.endpoint'

@Pipe({
  name: 'recordWorkTitleNameLabel',
})
export class RecordWorkTitleNameLabelPipe implements PipeTransform {
  transform(value: WorksTitleName): unknown {
    return WorksTitleNameLabel[value]
  }
}
