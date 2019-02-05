export interface Contestant {
  id: string;
  name: string;
  emailAddress?: string;
  gender?: "male" | "female";
  age?: number;
}
