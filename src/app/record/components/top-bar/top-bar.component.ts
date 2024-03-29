import { Component, Input, OnDestroy, OnInit } from '@angular/core'
import { UserRecord } from '../../../types/record.local'
import { PlatformInfo, PlatformInfoService } from '../../../cdk/platform-info'
import { ModalNameComponent } from './modals/modal-name/modal-name.component'
import { ModalBiographyComponent } from './modals/modal-biography/modal-biography.component'
import { takeUntil, tap } from 'rxjs/operators'
import { Subject } from 'rxjs'
import { UserService } from '../../../core'
import { RecordService } from '../../../core/record/record.service'
import { Assertion, UserInfo } from '../../../types'
import { UserStatus } from '../../../types/userStatus.endpoint'
import { RecordEmailsService } from '../../../core/record-emails/record-emails.service'
import { MatDialog } from '@angular/material/dialog'
import { VerificationEmailModalService } from '../../../core/verification-email-modal/verification-email-modal.service'
import { isEmpty } from 'lodash'

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: [
    './top-bar.component.scss',
    './top-bar.component.scss-theme.scss',
  ],
  preserveWhitespaces: true,
})
export class TopBarComponent implements OnInit, OnDestroy {
  $destroy: Subject<boolean> = new Subject<boolean>()
  @Input() isPublicRecord: string

  userInfo: UserInfo
  userRecord: UserRecord
  userStatus: UserStatus

  modalNameComponent = ModalNameComponent
  modalBiographyComponent = ModalBiographyComponent

  platform: PlatformInfo
  givenNames = ''
  familyName = ''
  creditName = ''
  expandedContent = false
  recordWithIssues: boolean
  justRegistered: boolean
  emailVerified: boolean
  checkEmailValidated: boolean
  inDelegationMode: boolean
  @Input() loadingUserRecord = true

  regionNames = $localize`:@@topBar.names:Names`
  regionBiography = $localize`:@@topBar.biography:Biography`

  ariaLabelName: string
  constructor(
    _dialog: MatDialog,
    _platform: PlatformInfoService,
    private _user: UserService,
    private _record: RecordService,
    private _recordEmails: RecordEmailsService,
    private _verificationEmailModalService: VerificationEmailModalService
  ) {
    _platform
      .get()
      .pipe(takeUntil(this.$destroy))
      .subscribe((data) => {
        this.platform = data
        if (this.platform.queryParameters.hasOwnProperty('justRegistered')) {
          this.justRegistered = true
        }

        if (this.platform.queryParameters.hasOwnProperty('emailVerified')) {
          this.emailVerified = true
        }
      })
    _user
      .getUserSession()
      .pipe(takeUntil(this.$destroy))
      .subscribe((data) => {
        this.userStatus = data
      })
  }

  ngOnInit(): void {
    this._record
      .getRecord({
        publicRecordId: this.isPublicRecord || undefined,
      })
      .pipe(takeUntil(this.$destroy))
      .subscribe((userRecord) => {
        this.recordWithIssues = userRecord?.userInfo?.RECORD_WITH_ISSUES
        this.userRecord = userRecord
        this.userInfo = userRecord?.userInfo

        if (!isEmpty(this.userRecord?.names)) {
          this.setNames()
          this.getAriaLabelName()
        }
      })
  }

  private setNames() {
    this.givenNames = this.userRecord?.names?.givenNames
      ? this.userRecord.names.givenNames.value
      : ''
    this.familyName = this.userRecord?.names?.familyName
      ? this.userRecord.names.familyName.value
      : ''
    this.creditName = this.userRecord?.names?.creditName
      ? this.userRecord.names.creditName.value
      : ''
  }

  private getAriaLabelName() {
    if (this.userRecord?.names) {
      if (this.userRecord?.names?.creditName?.value) {
        this.ariaLabelName = this.userRecord?.names?.creditName?.value
      } else {
        if (this.userRecord?.names?.givenNames?.value) {
          this.ariaLabelName = this.userRecord?.names?.givenNames?.value
        }
        if (this.userRecord?.names?.familyName?.value) {
          if (this.ariaLabelName) {
            this.ariaLabelName =
              this.ariaLabelName +
              ' ' +
              this.userRecord?.names?.familyName?.value
          } else {
            this.ariaLabelName = this.userRecord?.names?.familyName?.value
          }
        }
      }
    }
    return
  }

  getOtherNamesUnique(otherNames: Assertion[]): string {
    return otherNames
      .map((otherName) => {
        return otherName.content
      })
      .filter(function (item, pos, array) {
        return (
          array
            .map((x) => x.toLowerCase().trim())
            .indexOf(item.toLowerCase().trim()) === pos
        )
      })
      .join(', ')
  }

  resendVerificationEmailModal(email: string) {
    this._verificationEmailModalService.openVerificationEmailModal(email)
  }

  collapse(): void {
    this.expandedContent = !this.expandedContent
  }

  ngOnDestroy() {
    this.$destroy.next(true)
    this.$destroy.unsubscribe()
  }
}
