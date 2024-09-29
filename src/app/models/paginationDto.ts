export class PaginationDTO {
  id: number;
  page: number;
  recordsNumber: number;
  filter2?: string;

  constructor(id: number, page: number = 1, recordsNumber: number = 6, filter?: string) {
    this.id = id;
    this.page = page;
    this.recordsNumber = recordsNumber;
    this.filter2 = filter;
  }
}
