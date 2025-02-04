import type { IKnightDTO } from "./IKnightDTO";

export interface IWeaponDTO {
  _id: string;
  name: string;
  mod: number;
  attribute: string;
  knights?: IKnightDTO[];
}