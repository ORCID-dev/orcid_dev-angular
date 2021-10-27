import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';
import { WorkIdType, WorkRelationships } from 'src/app/types/works.endpoint';


@Component({
  selector: 'app-work-external-identifiers-edit',
  templateUrl: './work-external-identifiers-edit.component.html',
  styleUrls: [
    './work-external-identifiers-edit.component.scss',
    'work-external-identifiers-edit.component.scss-theme.scss',
  ],
})
export class WorkExternalIdentifiersEditComponent implements OnInit {
  @ViewChild('externalIdentifierType') externalIdentifierTypeRef: MatSelect
  @Input() externalIdForm: FormGroup
  @Input() index: number
  @Input() workIdTypes: WorkIdType[]
  @Output() cancelEvent = new EventEmitter<void>()
  matcher = new MyErrorStateMatcher()

  workRelationships: WorkRelationships[] = Object.keys(
    WorkRelationships
  ) as WorkRelationships[]
  backupValue: any

  ngOrcidSelectIdentifierType = $localize`:@@works.selectAnIdentifier:Select an identifier type`

  constructor(private changeDedectionRef: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.backupValue = this.externalIdForm.value
  }

  ngAfterViewInit() {
    this.externalIdentifierTypeRef.focus()
    this.changeDedectionRef.detectChanges()
  }

  cancel() {
    this.externalIdForm.setValue(this.backupValue)
    this.cancelEvent.emit()
  }
}

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null): boolean {
    return control.hasError('required') && control.touched
  }
}
