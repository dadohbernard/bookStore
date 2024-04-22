export class Book {
    title: string;
    writer: string;
    coverImage: string;
    point: number;
    tag: string[];
    status: string;
  
    constructor(title: string, writer: string, coverImage: string, point: number, tag: string[], status: string) {
      this.title = title;
      this.writer = writer;
      this.coverImage = coverImage;
      this.point = point;
      this.tag = tag;
      this.status = status;
    }
  }
  