class STATUS {
  constructor(public id: number, public name: string) {}
}

class USER {
  constructor(
    public id: number,
    public full_name: string,
    public phone_number: string
  ) {}
}

export { STATUS, USER };
