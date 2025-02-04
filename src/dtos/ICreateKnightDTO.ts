import type { IAttributeDTO } from "./IAttributeDTO";

export interface ICreateKnightDTO {
  name: string,
  nickname: string,
  birthday: Date,
  keyAttribute: string,
  weapons: string[],
  attributes: IAttributeDTO
}