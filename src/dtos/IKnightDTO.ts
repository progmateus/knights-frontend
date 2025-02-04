import type { IAttributeDTO } from "./IAttributeDTO";
import type { IWeaponDTO } from "./IWeaponDTO";

export interface IKnightDTO {
  _id: string;
  name: string;
  nickname: string;
  birthday: Date;
  keyAttribute: string;
  isHero: boolean;
  attributes: IAttributeDTO;
  weapons: IWeaponDTO[];
  weaponsCount: number;
  age: number;
  attack: number;
  exp: number;
}