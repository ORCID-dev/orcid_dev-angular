import {
  Contributor,
  ExternalIdentifier,
  MonthDayYearDate,
  Title,
  Value,
  Visibility,
} from './common.endpoint'
import { AssertionBase } from './record.endpoint'

export interface OrganizationDefinedFundingSubType {
  alreadyIndexed: boolean
  subtype: Value
}

export interface FundingType {
  errors?: any[]
  value: FundingTypes
  required?: boolean
  getRequiredMessage?: any
}

export interface FundingGroup {
  fundings: Funding[]
  activePutCode: number
  groupId: string
  activeVisibility: string // TODO is this always empty?
  userVersionPresent: boolean
  externalIdentifiers: ExternalIdentifier[]
  defaultFunding: Funding
}

export interface Funding extends AssertionBase {
  visibility: Visibility
  putCode: Value
  fundingTitle: Title
  description: Value
  fundingName: Value
  fundingType: FundingType
  organizationDefinedFundingSubType: OrganizationDefinedFundingSubType
  currencyCode: Value
  amount: Value
  url: Value
  startDate: MonthDayYearDate
  endDate: MonthDayYearDate
  externalIdentifiers?: ExternalIdentifier[]
  contributors?: Contributor[]
  disambiguatedFundingSourceId: Value
  disambiguationSource: Value
  city: Value
  region: Value
  country: Value
  countryForDisplay?: string
  typeForDisplay?: string
  dateSortString?: MonthDayYearDate
  fullyLoaded?: boolean
}

export enum FundingTypes {
  award = 'award',
  contract = 'contract',
  grant = 'grant',
  salary_award = 'salary-award',
}

export const FundingTypesLabel = {
  [FundingTypes.award]: $localize`:@@funding.award:Award`,
  [FundingTypes.contract]: $localize`:@@funding.contract:Contract`,
  [FundingTypes.grant]: $localize`:@@funding.grant:Grant`,
  [FundingTypes.salary_award]: $localize`:@@funding.salary_award:Salary award`,
}

export enum FundingRelationships {
  self = 'self',
  'part-of' = 'part-of',
}

export const FundingRelationshipsLabels = {
  self: $localize`:@@funding.self:Self`,
  'part-of': $localize`:@@funding.partOf:Part of`,
}

export const FundingRelationshipsHintsLabels = {
  self: $localize`:@@funding.selfDescription:The identifier applies to the funding award itself.`,
  'part-of': $localize`:@@funding.partOfDescription:The identifier applies to the larger award of which the project is part.`,
}

export enum FundingExternalIndentifierType {
  grant_number = 'grant_number',
}

export const LanguageMap = {
  ab: 'Abkhazian',
  aa: 'Afar',
  af: 'Afrikaans',
  ak: 'Akan',
  sq: 'Albanian',
  am: 'Amharic',
  ar: 'Arabic',
  an: 'Aragonese',
  hy: 'Armenian',
  as: 'Assamese',
  av: 'Avaric',
  ae: 'Avestan',
  ay: 'Aymara',
  az: 'Azerbaijani',
  bm: 'Bambara',
  bn: 'Bangla',
  ba: 'Bashkir',
  eu: 'Basque',
  be: 'Belarusian',
  bh: 'Bihari',
  bi: 'Bislama',
  bs: 'Bosnian',
  br: 'Breton',
  bg: 'Bulgarian',
  my: 'Burmese',
  ca: 'Catalan',
  ch: 'Chamorro',
  ce: 'Chechen',
  zh_CN: 'Chinese (simplified)',
  zh_TW: 'Chinese (traditional)',
  cu: 'Church Slavic',
  cv: 'Chuvash',
  kw: 'Cornish',
  co: 'Corsican',
  cr: 'Cree',
  hr: 'Croatian',
  cs: 'Czech',
  da: 'Danish',
  dv: 'Divehi',
  nl: 'Dutch',
  dz: 'Dzongkha',
  en: 'English',
  eo: 'Esperanto',
  et: 'Estonian',
  ee: 'Ewe',
  fo: 'Faroese',
  fj: 'Fijian',
  fi: 'Finnish',
  fr: 'French',
  ff: 'Fulah',
  gl: 'Galician',
  lg: 'Ganda',
  ka: 'Georgian',
  de: 'German',
  el: 'Greek',
  gn: 'Guarani',
  gu: 'Gujarati',
  ht: 'Haitian Creole',
  ha: 'Hausa',
  iw: 'Hebrew',
  hz: 'Herero',
  hi: 'Hindi',
  ho: 'Hiri Motu',
  hu: 'Hungarian',
  is: 'Icelandic',
  io: 'Ido',
  ig: 'Igbo',
  in: 'Indonesian',
  ia: 'Interlingua',
  ie: 'Interlingue',
  iu: 'Inuktitut',
  ik: 'Inupiaq',
  ga: 'Irish',
  it: 'Italian',
  ja: 'Japanese',
  jv: 'Javanese',
  kl: 'Kalaallisut',
  kn: 'Kannada',
  kr: 'Kanuri',
  ks: 'Kashmiri',
  kk: 'Kazakh',
  km: 'Khmer',
  ki: 'Kikuyu',
  rw: 'Kinyarwanda',
  kv: 'Komi',
  kg: 'Kongo',
  ko: 'Korean',
  kj: 'Kuanyama',
  ku: 'Kurdish',
  ky: 'Kyrgyz',
  lo: 'Lao',
  la: 'Latin',
  lv: 'Latvian',
  li: 'Limburgish',
  ln: 'Lingala',
  lt: 'Lithuanian',
  lu: 'Luba-Katanga',
  lb: 'Luxembourgish',
  mk: 'Macedonian',
  mg: 'Malagasy',
  ms: 'Malay',
  ml: 'Malayalam',
  mt: 'Maltese',
  gv: 'Manx',
  mi: 'Maori',
  mr: 'Marathi',
  mh: 'Marshallese',
  mo: 'Moldavian',
  mn: 'Mongolian',
  na: 'Nauru',
  nv: 'Navajo',
  ng: 'Ndonga',
  ne: 'Nepali',
  nd: 'North Ndebele',
  se: 'Northern Sami',
  no: 'Norwegian',
  nb: 'Norwegian Bokmål',
  nn: 'Norwegian Nynorsk',
  ny: 'Nyanja',
  oc: 'Occitan',
  or: 'Odia',
  oj: 'Ojibwa',
  om: 'Oromo',
  os: 'Ossetic',
  pi: 'Pali',
  ps: 'Pashto',
  fa: 'Persian',
  pl: 'Polish',
  pt: 'Portuguese',
  pa: 'Punjabi',
  qu: 'Quechua',
  ro: 'Romanian',
  rm: 'Romansh',
  rn: 'Rundi',
  ru: 'Russian',
  sm: 'Samoan',
  sg: 'Sango',
  sa: 'Sanskrit',
  sc: 'Sardinian',
  gd: 'Scottish Gaelic',
  sr: 'Serbian',
  sn: 'Shona',
  ii: 'Sichuan Yi',
  sd: 'Sindhi',
  si: 'Sinhala',
  sk: 'Slovak',
  sl: 'Slovenian',
  so: 'Somali',
  nr: 'South Ndebele',
  st: 'Southern Sotho',
  es: 'Spanish',
  su: 'Sundanese',
  sw: 'Swahili',
  ss: 'Swati',
  sv: 'Swedish',
  tl: 'Tagalog',
  ty: 'Tahitian',
  tg: 'Tajik',
  ta: 'Tamil',
  tt: 'Tatar',
  te: 'Telugu',
  th: 'Thai',
  bo: 'Tibetan',
  ti: 'Tigrinya',
  to: 'Tongan',
  ts: 'Tsonga',
  tn: 'Tswana',
  tr: 'Turkish',
  tk: 'Turkmen',
  tw: 'Twi',
  uk: 'Ukrainian',
  ur: 'Urdu',
  ug: 'Uyghur',
  uz: 'Uzbek',
  ve: 'Venda',
  vi: 'Vietnamese',
  vo: 'Volapük',
  wa: 'Walloon',
  cy: 'Welsh',
  fy: 'Western Frisian',
  wo: 'Wolof',
  xh: 'Xhosa',
  ji: 'Yiddish',
  yo: 'Yoruba',
  za: 'Zhuang',
  zu: 'Zulu',
}

export const CurrencyCodeMap = {
  ADP: 'ADP',
  AED: 'AED',
  AFA: 'AFA',
  AFN: 'AFN',
  ALL: 'ALL',
  AMD: 'AMD',
  ANG: 'ANG',
  AOA: 'AOA',
  ARS: 'ARS',
  ATS: 'ATS',
  AUD: 'AUD',
  AWG: 'AWG',
  AYM: 'AYM',
  AZM: 'AZM',
  AZN: 'AZN',
  BAM: 'BAM',
  BBD: 'BBD',
  BDT: 'BDT',
  BEF: 'BEF',
  BGL: 'BGL',
  BGN: 'BGN',
  BHD: 'BHD',
  BIF: 'BIF',
  BMD: 'BMD',
  BND: 'BND',
  BOB: 'BOB',
  BOV: 'BOV',
  BRL: 'BRL',
  BSD: 'BSD',
  BTN: 'BTN',
  BWP: 'BWP',
  BYB: 'BYB',
  BYN: 'BYN',
  BYR: 'BYR',
  BZD: 'BZD',
  CAD: 'CAD',
  CDF: 'CDF',
  CHE: 'CHE',
  CHF: 'CHF',
  CHW: 'CHW',
  CLF: 'CLF',
  CLP: 'CLP',
  CNY: 'CNY',
  COP: 'COP',
  COU: 'COU',
  CRC: 'CRC',
  CSD: 'CSD',
  CUC: 'CUC',
  CUP: 'CUP',
  CVE: 'CVE',
  CYP: 'CYP',
  CZK: 'CZK',
  DEM: 'DEM',
  DJF: 'DJF',
  DKK: 'DKK',
  DOP: 'DOP',
  DZD: 'DZD',
  EEK: 'EEK',
  EGP: 'EGP',
  ERN: 'ERN',
  ESP: 'ESP',
  ETB: 'ETB',
  EUR: 'EUR',
  FIM: 'FIM',
  FJD: 'FJD',
  FKP: 'FKP',
  FRF: 'FRF',
  GBP: 'GBP',
  GEL: 'GEL',
  GHC: 'GHC',
  GHS: 'GHS',
  GIP: 'GIP',
  GMD: 'GMD',
  GNF: 'GNF',
  GRD: 'GRD',
  GTQ: 'GTQ',
  GWP: 'GWP',
  GYD: 'GYD',
  HKD: 'HKD',
  HNL: 'HNL',
  HRK: 'HRK',
  HTG: 'HTG',
  HUF: 'HUF',
  IDR: 'IDR',
  IEP: 'IEP',
  ILS: 'ILS',
  INR: 'INR',
  IQD: 'IQD',
  IRR: 'IRR',
  ISK: 'ISK',
  ITL: 'ITL',
  JMD: 'JMD',
  JOD: 'JOD',
  JPY: 'JPY',
  KES: 'KES',
  KGS: 'KGS',
  KHR: 'KHR',
  KMF: 'KMF',
  KPW: 'KPW',
  KRW: 'KRW',
  KWD: 'KWD',
  KYD: 'KYD',
  KZT: 'KZT',
  LAK: 'LAK',
  LBP: 'LBP',
  LKR: 'LKR',
  LRD: 'LRD',
  LSL: 'LSL',
  LTL: 'LTL',
  LUF: 'LUF',
  LVL: 'LVL',
  LYD: 'LYD',
  MAD: 'MAD',
  MDL: 'MDL',
  MGA: 'MGA',
  MGF: 'MGF',
  MKD: 'MKD',
  MMK: 'MMK',
  MNT: 'MNT',
  MOP: 'MOP',
  MRO: 'MRO',
  MRU: 'MRU',
  MTL: 'MTL',
  MUR: 'MUR',
  MVR: 'MVR',
  MWK: 'MWK',
  MXN: 'MXN',
  MXV: 'MXV',
  MYR: 'MYR',
  MZM: 'MZM',
  MZN: 'MZN',
  NAD: 'NAD',
  NGN: 'NGN',
  NIO: 'NIO',
  NLG: 'NLG',
  NOK: 'NOK',
  NPR: 'NPR',
  NZD: 'NZD',
  OMR: 'OMR',
  PAB: 'PAB',
  PEN: 'PEN',
  PGK: 'PGK',
  PHP: 'PHP',
  PKR: 'PKR',
  PLN: 'PLN',
  PTE: 'PTE',
  PYG: 'PYG',
  QAR: 'QAR',
  ROL: 'ROL',
  RON: 'RON',
  RSD: 'RSD',
  RUB: 'RUB',
  RUR: 'RUR',
  RWF: 'RWF',
  SAR: 'SAR',
  SBD: 'SBD',
  SCR: 'SCR',
  SDD: 'SDD',
  SDG: 'SDG',
  SEK: 'SEK',
  SGD: 'SGD',
  SHP: 'SHP',
  SIT: 'SIT',
  SKK: 'SKK',
  SLL: 'SLL',
  SOS: 'SOS',
  SRD: 'SRD',
  SRG: 'SRG',
  SSP: 'SSP',
  STD: 'STD',
  STN: 'STN',
  SVC: 'SVC',
  SYP: 'SYP',
  THB: 'THB',
  THJ: 'THJ',
  TMM: 'TMM',
  TMT: 'TMT',
  TND: 'TND',
  TOP: 'TOP',
  TPE: 'TPE',
  TRL: 'TRL',
  TRY: 'TRY',
  TTD: 'TTD',
  TWD: 'TWD',
  TZS: 'TZS',
  UAH: 'UAH',
  UGX: 'UGX',
  USD: 'USD',
  USS: 'USS',
  UYI: 'UYI',
  UYU: 'UYU',
  UZS: 'UZS',
  VEB: 'VEB',
  VEF: 'VEF',
  VES: 'VES',
  VND: 'VND',
  VUV: 'VUV',
  WST: 'WST',
  XAF: 'XAF',
  XAG: 'XAG',
  XAU: 'XAU',
  XBA: 'XBA',
  XBB: 'XBB',
  XBC: 'XBC',
  XBD: 'XBD',
  XCD: 'XCD',
  XDR: 'XDR',
  XFO: 'XFO',
  XFU: 'XFU',
  XOF: 'XOF',
  XPD: 'XPD',
  XPF: 'XPF',
  XPT: 'XPT',
  XSU: 'XSU',
  XTS: 'XTS',
  XUA: 'XUA',
  XXX: 'XXX',
  YER: 'YER',
  YUM: 'YUM',
  ZAR: 'ZAR',
  ZMK: 'ZMK',
  ZMW: 'ZMW',
  ZWD: 'ZWD',
  ZWL: 'ZWL',
  ZWN: 'ZWN',
  ZWR: 'ZWR',
}
