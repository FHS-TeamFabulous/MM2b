/**
 * Created by Maxi on 24.04.17.
 */

import React from 'react';
import style from './style.scss';
import BookCollection from './../book-collection';

export default class BibliothekPage extends React.Component {
    render() {
        return (
            <div className={style.content}>
                <h1 style={{color: "#00b0de", textAlign:"center", marginTop:"50px"}}>Viele schöne Bücher, Märchen und Kindergeschichten zum Vorlesen</h1>
                <h3 style={{textAlign: "left", marginTop:"60px"}}>Unsere Bücher</h3>
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


