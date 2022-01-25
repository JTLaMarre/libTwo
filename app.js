// Book Class
class Book {
    construtor(title,author,type){
        this.title=title;
        this.author=author;
        this.type=type;
    }
}
// UI class
class UI{
    static displayBooks(){
        
        const books=Store.getBooks();
        books.forEach((book) => UI.addBookToList(book));
    }
    static addBookToList(book){
        const list= document.querySelector('#book-list');

        const row = document.createElement('tr');
        row.innerHTML=`
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.type}</td>
        <tb><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
        `;

        list.appendChild(row);
    }
    static deleteBook(el){
        if (el.classList.contains('delete')) {
            el.parentElement.parentElement.remove();
        }
    }

    static clearFields(){
        document.querySelector('#title').value='';
        document.querySelector('#author').value='';
        document.querySelector('#type').value='';
    }
}
// Store Class handles storage 

class Store{

    static getBooks(){
        let books=localStorage.getItem('books');
        
        if (books==null) {
            books=[];
            
        }
        else{
            books=JSON.parse(books);
        }
        return books;
        
    }
    static addBook(book){
        let books = Store.getBooks();
        if(books==undefined){
            books=[]; 
        }
        
        console.log(book);
        books.push(book);
        console.log(books);
        localStorage.setItem('books',JSON.stringify(books));
        
    }
    static removeBook(title){
        const books=Store.getBooks();

        books.forEach((book,index)=>{
            if (book.title==title) {
                books.splice(index,1)
            }
        });
        localStorage.setItem('books',JSON.stringify(books));
    }
    

}

// Events


// display books
document.addEventListener('DOMContentLoaded',UI.displayBooks())


// add book
document.querySelector('#book-form').addEventListener('submit',(e)=>{
    e.preventDefault();
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const type = document.querySelector('#type').value;
    
    const book = new Book();
    book.title=title;
    book.author=author;
    book.type=type;

    UI.addBookToList(book);
    Store.addBook(book);
    UI.clearFields();
})

// remove book
document.querySelector('#book-list').addEventListener('click',(e)=>{
    Store.removeBook(e.target.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.textContent);
    UI.deleteBook(e.target);
    
})