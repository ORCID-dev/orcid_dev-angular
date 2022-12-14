import { AssertionBase, GroupBase } from './record.endpoint'
import { ExternalIdentifier } from './common.endpoint'

export interface Item {
  resourceName: string
  resourceType: string
  hosts: Host[]
  externalIdentifiers: ExternalIdentifier[]
  items: any
  url: any
  showDetails: boolean
}

export interface Host {
  city: string
  country: string
  disambiguationSource: string
  name: string
  orgDisambiguatedId: string
  region: string
}

export interface ResearchResource extends AssertionBase {
  endDate: any
  externalIdentifiers: ExternalIdentifier[]
  hosts: Host[]
  items: Item[]
  lastModifiedDate: any
  path: any
  startDate
  title: string
  translatedTitle: string
  translatedTitleLanguageCode: string
  putCode: string
  showDetails: boolean
}

export interface ResearchResourcesGroup extends GroupBase {
  defaultResearchResource: ResearchResource
  researchResources: ResearchResource[]
}

export interface ResearchResourcesEndpoint {
  groups: ResearchResourcesGroup[]
  nextOffset: number
  totalGroups: number
  offset: number // THIS DATA FIELD IS ATTACHED ON THE FRONTEND
  pageIndex: number // THIS DATA FIELD IS ATTACHED ON THE FRONTEND
  pageSize: number // THIS DATA FIELD IS ATTACHED ON THE FRONTEND
}
