import React from 'react';
import style from './style.scss';
import BookCollection from './../book-collection';

export default class Library extends React.Component {
    render() {
        return (
            <div className={style.content}>
                <h1 className={style.titleHeader}>Viele schöne Bücher, Märchen und Kindergeschichten zum Vorlesen</h1>
                <h3 className={style.paragraphHeader} >Unsere Bücher</h3>
                <p>Hier finden Sie unsere wachsendes Angebot an tollen Büchern, Märchen und Gute-Nacht
                    Kindergeschichten zum Vorlesen. Die Auswahl können Sie  durch die verschieden Filtermöglichkeiten
                    (rechts) einschränken. Kindern Bücher online vorlesen ist ganz einfach. Buch durch Klick auf das
                    Titelbild auswählen und los geht’s.
                </p>
                <h3>Bücher neu im Angebot</h3>
                <BookCollection/>
            </div>
        );
    }
}


