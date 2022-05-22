import React from 'react';
import editingRender from './editingRender';
import NormalRender from './NormalRender';

// Here we accept an array of pieces as a prop
export default function Editor ({pieces}) {

    //prob add key below
    var renP = [];
    for (var i = 0; i < pieces.length; i++) {
        renP.push( <NormalRender  piece={pieces[i]} Key={i} />);
    }
    return (
        <div>{renP}</div>
    )

   
}
