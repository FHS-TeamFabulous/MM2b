import React from 'react';
import style from './style.scss';
import BookCollection from './../book-collection';
import CustomModal from './../custom-modal';

let books = {1: {bookTitle: "Trödltrudls Klippklapptraum - Tyrolia", ageOf: 6},
             2: {bookTitle: "Nixe Nane - Sind Flussnixen gefährlich?", ageOf: 7},
             3: {bookTitle: "Foxy Joxy Plays A Trick", ageOf: 5},
             4: {bookTitle: "Gaggalagu - kookbooks", ageOf: 8},
             5: {bookTitle: "Mutig, mutig - Atlantis", ageOf: 5}};

const cat1 = Object.keys(books).map(id => books[id]).filter(book => book.ageOf === 5);
const cat2 = Object.keys(books).map(id => books[id]).filter(book => book.ageOf === 6);
const cat3 = Object.keys(books).map(id => books[id]).filter(book => book.ageOf === 7);
const cat4 = Object.keys(books).map(id => books[id]).filter(book => book.ageOf === 8);


export default class Library extends React.Component {
    render() {
        return (
            <div className={style.content}>
                <CustomModal />
                <h1 className={style.titleHeader}>Viele schöne Bücher, Märchen und Kindergeschichten zum Vorlesen</h1>
                <h3 className={style.paragraphHeader} >Unsere Bücher</h3>
                <p>Hier finden Sie unsere wachsendes Angebot an tollen Büchern, Märchen und Gute-Nacht
                    Kindergeschichten zum Vorlesen. Die Auswahl können Sie  durch die verschieden Filtermöglichkeiten
                    (rechts) einschränken. Kindern Bücher online vorlesen ist ganz einfach. Buch durch Klick auf das
                    Titelbild auswählen und los geht’s.
                </p>

                <BookCollection array={cat1}/>

                <BookCollection array={cat2}/>

                <BookCollection array={cat3}/>

                <BookCollection array={cat4}/>


            </div>
        );
    }
}


