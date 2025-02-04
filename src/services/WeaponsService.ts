import { api } from "./api";

export function ListWeaponsService() {
  return api({
    url: 'weapons',
    method: 'get',
  })
}