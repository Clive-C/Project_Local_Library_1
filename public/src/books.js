function findAuthorById(authors, id) {
  const result = authors.find((author) => author.id == id);
  return result;
}

function findBookById(books, id) {
  const result = books.find((book) => book.id == id);
  return result;
}

function partitionBooksByBorrowedStatus(books) {
  let loanedOut =[];
  let returned =[];
  let result = [];
  
  books.forEach((book) => { book.borrows[0].returned ? returned.push(book) : loanedOut.push(book)})
  result.push(loanedOut);
  result.push(returned);
  return result;
}

function getBorrowersForBook(book, accounts) {
  let list = book.borrows;
  let result =[];
  
  list.forEach((entry) => {
    accounts.forEach((account) => {
      if(account.id == entry.id){
        const modifiedAccount = {...account, ...entry};  
        result.push(modifiedAccount);
      }
    });
  });
  return result.slice(0,10);
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
