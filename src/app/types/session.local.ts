import { UserInfo, NameForm, RequestInfoForm } from '.'
import { ThirdPartyAuthData } from './sign-in-data.endpoint'
import { TrustedIndividuals } from './trusted-individuals.endpoint'

export interface UserSession {
  userInfo: UserInfo
  trustedIndividuals?: TrustedIndividuals
  nameForm: NameForm
  oauthSession: RequestInfoForm
  oauthSessionIsLoggedIn: boolean
  displayName: string
  orcidUrl: string
  effectiveOrcidUrl: string
  loggedIn: boolean
  thirdPartyAuthData: ThirdPartyAuthData
}

export interface UserSessionUpdateParameters {
  checkTrigger: {
    forceSessionUpdate?: boolean
    postLoginUpdate?: boolean
    timerUpdate?: number
  }
  loggedIn: boolean
}
