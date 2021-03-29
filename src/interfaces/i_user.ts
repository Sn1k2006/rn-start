import {IFile} from "./i_app";
import {EPlatforms, ESocialType, ESubscribed} from "../enums/e_app";


export interface IUser {
  avatar?: IFile | null
  email?: string | null
  id?: number
  lang?: string
  name?: string | null
  token?: string
  fcm?: string
  auth_type?: keyof typeof ESocialType | null
  bundle_id?: string
  country?: string
  device_id?: string
  facebook_id?: string
  google_id?: string
  is_premium?: 0 | 1
  is_push?: 0 | 1
  platform?: EPlatforms
  social_id?: string
  subscribed?: keyof typeof ESubscribed | null
  target?: string | null
  timezone?: string
  uuid?: string
}

