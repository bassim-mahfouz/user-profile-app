export class Profile {
    constructor(
      public id: number,
      public firstName: string,
      public lastName: string,
      public birthDate :Date,
      public permission : string[]
    ) {}
  }