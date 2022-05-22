import React from 'react';

// This needs an editing mode, but no deletion mode.
const Titler = ({form}) => {

    

    return (
        <div>
            <h1>{form.title}</h1>
            {form.description && <h3>{form.description}</h3>}
            {console.log(form)}
            {console.log(form.description)}

        </div>
    
    )
};

export default Titler;
