function findAccountById(accounts, id) {
  const result = accounts.find((account) => account.id == id);
  return result;
}

function sortAccountsByLastName(accounts) {
  const result = accounts.sort((nameA, nameB) => nameA.name.last.toLowerCase() > nameB.name.last.toLowerCase() ? 1 : -1);
  return result;
}

function getTotalNumberOfBorrows(account, books) {
  let result = 0;
  books.forEach((book) => {
    book.borrows.forEach((borrow) =>{
      if (borrow.id == account.id){
        result +=1;
      }
    })
  })
  return result;
}

function getBooksPossessedByAccount(account, books, authors) {
  let list =[];
  books.forEach((book) => {
    book.borrows.forEach((borrow) =>{
      if (borrow.id == account.id && borrow.returned == false){
        const modBook = book;
        const bookAuthor = authors.find((author) => author.id == book.authorId);
        modBook.author = bookAuthor;
        list.push(modBook);
      }
    })
  })
  return list;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
