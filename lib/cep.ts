interface CepParams {
  cep: string;
  street: string;
  city: string;
  state: string;
  neighborhood: string;
}

export default class Cep {
  readonly cep: string;
  readonly street: string;
  readonly city: string;
  readonly state: string;
  readonly neighborhood: string;
  constructor({ cep, street, city, state, neighborhood }: CepParams) {
    this.cep = cep;
    this.street = street;
    this.city = city;
    this.state = state;
    this.neighborhood = neighborhood;
  }
}
