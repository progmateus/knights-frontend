import type { ICreateKnightDTO } from "../dtos/ICreateKnightDTO";
import type { IPaginationDTO } from "../dtos/IPaginationDTO";
import { api } from "./api";

export function CreateKnightService({ name, nickname, birthday, keyAttribute, attributes, weapons }: ICreateKnightDTO) {
  return api({
    url: 'knights',
    method: 'post',
    data: {
      name, nickname, birthday, keyAttribute, attributes, weapons
    }
  })
}

export function ListKnightsService({ page, search, heroes }: IPaginationDTO) {
  return api({
    url: 'knights',
    method: 'get',
    params: {
      page,
      search,
      heroes
    }
  })
}

export function GetKnightProfileService(id: string) {
  return api({
    url: `knights/${id}`,
    method: 'get',

  })
}

export function DeleteKnightService(id: string) {
  return api({
    url: `knights/${id}`,
    method: 'delete',

  })
}

export function UpdateKnightNicknameService(id: string, nickname: string) {
  return api({
    url: `knights/${id}`,
    method: 'put',
    data: {
      nickname
    }

  })
}