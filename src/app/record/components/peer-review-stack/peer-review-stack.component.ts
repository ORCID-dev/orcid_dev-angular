import { Component, EventEmitter, HostBinding, Input, OnInit, Output } from '@angular/core'
import { VisibilityStrings } from '../../../types/common.endpoint'
import { PeerReview, PeerReviewDuplicateGroup } from '../../../types/record-peer-review.endpoint'
import { first } from 'rxjs/operators'
import { RecordPeerReviewService } from '../../../core/record-peer-review/record-peer-review.service'

@Component({
  selector: 'app-peer-review-stack',
  templateUrl: './peer-review-stack.component.html',
  styleUrls: [
    './peer-review-stack.component.scss',
    './peer-review-stack.component.scss-theme.scss'
  ]
})
export class PeerReviewStackComponent implements OnInit {
  @HostBinding('class.display-the-stack') displayTheStackClass = false
  _peerReviewStack: PeerReviewDuplicateGroup
  visibility: VisibilityStrings
  @Input() isPublicRecord: string

  @Input()
  set peerReviewStack(value: PeerReviewDuplicateGroup) {
    this._peerReviewStack = value
    this.setInitialStates(value)
  }
  get peerReviewStack(): PeerReviewDuplicateGroup {
    return this._peerReviewStack
  }

  _displayTheStack = false
  set displayTheStack(mode: boolean) {
    this._displayTheStack = mode
    this.displayTheStackClass = this._displayTheStack
    this.setInitialStates(this._peerReviewStack, true)
  }
  get displayTheStack(): boolean {
    return this._displayTheStack
  }

  @Output() total: EventEmitter<any> = new EventEmitter()
  @Output() expanded: EventEmitter<any> = new EventEmitter()

  stackPanelsDisplay: { [key: string]: { topPanelOfTheStack: boolean } } = {}
  panelDetailsState: {
    [key: string]: {
      state: boolean
    }
  } = {}

  detailsPeerReviews: {
    putCode: number
    peerReview: PeerReview
  }[] = []
  isMobile: boolean


  constructor(
    private _recordPeerReviewService: RecordPeerReviewService
  ) { }

  /**
   * Set the panelDetails and top of the stack card to default mode
   */
  private setInitialStates(group: PeerReviewDuplicateGroup, force = false) {
    group.peerReviews.forEach((peerReview) => {
      this.setDefaultPanelsDisplay(peerReview, force)
      this.setDefaultPanelDetailsState(peerReview, force)
    })
  }

  /**
   * On start, set the preferred source as the top panel of the stack
   */
  private setDefaultPanelsDisplay(peerReview: PeerReview, force = false) {
    if (this.stackPanelsDisplay[peerReview.putCode.value] === undefined || force) {
      this.stackPanelsDisplay[peerReview.putCode.value] = {
        topPanelOfTheStack: this.isPreferred(peerReview),
      }
    }
  }

  /**
   * On start, hide the details for all the panels
   */
  private setDefaultPanelDetailsState(peerReview: PeerReview, force = false) {
    if (this.panelDetailsState[peerReview.putCode.value] === undefined || force) {
      this.panelDetailsState[peerReview.putCode.value] = {
        state: false,
      }
    }
  }

  isPreferred(peerReview: PeerReview) {
    console.log(JSON.stringify(peerReview))
    const response =
      peerReview && this.peerReviewStack
        ? this.peerReviewStack.activePutCode.toString() === peerReview.putCode.value
        : false
    return response
  }

  /**
   * Show and hide details of the panel
   */
  toggleDetails(peerReview: PeerReview) {
    const putCode = peerReview.putCode.value
    this.panelDetailsState[putCode].state = !this.panelDetailsState[putCode]
      .state

    if (this.panelDetailsState[putCode].state) {
      // this.getDetails(work)
      //   .pipe(first())
      //   .subscribe(() => {})
    }
  }

  makePrimaryCard(peerReview: PeerReview) {
    // TODO
  }

  changeTopPanelOfTheStack(peerReview: PeerReview) {
    Object.keys(this.stackPanelsDisplay).forEach((key) => {
      this.stackPanelsDisplay[key].topPanelOfTheStack = false
    })
    this.stackPanelsDisplay[peerReview.putCode.value].topPanelOfTheStack = true
  }

  trackByPeerReviewStack(index, item: PeerReview) {
    return item.putCode
  }

  ngOnInit(): void {
  }

  getDetails(peerReview: PeerReview, putCode: number): void {
    if (this.isPublicRecord) {
      this._recordPeerReviewService
        .getPublicPeerReviewById(this.isPublicRecord, putCode)
        .pipe(first())
        .subscribe(
          (data) => {
            this.detailsPeerReviews.push({ putCode: putCode, peerReview: data })
            peerReview.showDetails = true
          },
          (error) => {
            console.error('getDetailsError', error)
          }
        )
    } else {
      this._recordPeerReviewService
        .getPeerReviewById(putCode)
        .pipe(first())
        .subscribe(
          (data) => {
            this.detailsPeerReviews.push({ putCode: putCode, peerReview: data })
            peerReview.showDetails = true
          },
          (error) => {
            console.error('getDetailsError', error)
          }
        )
    }
  }

  getPeerReview(putCode: number): PeerReview {
    if (this.detailsPeerReviews.length === 0) {
      return null
    }

    return this.detailsPeerReviews
      .filter((value) => value.putCode === putCode)
      .map((value) => {
        return value.peerReview
      })[0]
  }

  collapse(peerReview: PeerReview) {
    peerReview.showDetails = !peerReview.showDetails
  }

  expandedClicked(expanded: boolean) {
    this.expanded.emit({ type: 'peer-review', expanded })
  }
}
