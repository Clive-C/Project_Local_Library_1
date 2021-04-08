function getTotalBooksCount(books) {
  return books.length;
}

function getTotalAccountsCount(accounts) {
  return accounts.length;
}

function getBooksBorrowedCount(books) {
  const result = books.filter((book) => !book.borrows[0].returned);
  return result.length;
}

function getMostCommonGenres(books) {
  const genres = books.map((book) => book.genre);
  const sortGenres = genres.sort((genreA, genreB) => genreA.toLowerCase() > genreB.toLowerCase() ? 1 :-1 )
  let uniqueGenres = [sortGenres[0]];
  let result = [];
  
  for (let i = 1; i < sortGenres.length; i++){
    if (sortGenres[i] != sortGenres[i-1]){
      uniqueGenres.push(sortGenres[i]);
    }
  }

  uniqueGenres.forEach((uniqueGenre) => {
    const count = genres.filter((genre) => genre == uniqueGenre)
    const bookInfo = {};
    bookInfo.name = uniqueGenre;
    bookInfo.count = count.length;
    result.push(bookInfo);
  })
  // this is my helper function code
  return sortAndLimit(result);
}

function getMostPopularBooks(books) {
  let result = [];

  books.forEach((book) => {
    const bookInfo = {};
    const count = book.borrows.length;

    bookInfo.name = book.title
    bookInfo.count = count;
    result.push(bookInfo);
  })
  // this is my helper function code
  return sortAndLimit(result);
}

function getMostPopularAuthors(books, authors) {
  let result =[];

  
  authors.forEach((author) => {
    const booksOfAuthor = books.filter((book) => book.authorId == author.id);
    const count = booksOfAuthor.reduce((acc, book) => {
      acc += book.borrows.length
      return acc;
    }, 0);
    const authorInfo = {};
    
    authorInfo.name = `${author.name.first} ${author.name.last}`;
    authorInfo.count = count;
    result.push(authorInfo);  
  });
  // this is my helper function code
  return sortAndLimit(result);
}

/* helper function code to sort and limit the result to 5 entries. 
This was used in several instances as the output requested was a list by popularity with a limit of the number of entries*/

function sortAndLimit(input){
  const result = input.sort((countA, countB) => countA.count < countB.count ? 1: -1).slice(0,5);
  return result;
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
