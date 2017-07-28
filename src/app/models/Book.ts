export class Book {
  title: string;
  date: Date;
  author: string;

  constructor(title: string, date: Date, author: string) {
    this.title = title;
    this.date = date;
    this.author = author;
  }
}
