import React from 'react';
import "./rendering.css"


const NormalRender = ( {piece} ) => {

    if(piece.type == "header"){
        return (
            <div>
                <h3>{piece.props.htext}</h3>
                {piece.props.hsubtext  && <h5>{piece.props.hsubtext}</h5>}
            </div>
        )
    }else if (piece.type == "break"){
        return (
            <div>
                <div className="break"></div>
            </div>    
        )
    }else if (piece.type == "question"){

        if(piece.props.qtype == "text"){
            //if text box height is given, set it, else 1 line
            let r = 1;
            if(piece.props.inSize) r = piece.props.inSize;
            return (
                <div>
                    <div className="question"> {piece.props.qtext}</div>
                    {piece.props.qsubtext  && <div className="subquestion">{piece.props.qsubtext}</div>}
                    {<textarea className="textArea" rows={r} cols="50"></textarea>}{/*prob needs more styling lol*/}

                </div>
            )
        }else if (piece.props.qtype == "multiple"){
            //if text box height is given, set it, else 1 line
            
         
                var reno = [];

                for (var i = 0; i < piece.props.qoptions.length; i++) {

                    reno.push(<button type="button" >{piece.props.qoptions[i]}</button>)
                        
                    

                }

                
                    
                
            


            return (
                <div>
                    <div className="question"> {piece.props.qtext}</div>
                    {piece.props.qsubtext  && <div className="subquestion">{piece.props.qsubtext}</div>}
                    <div>{reno}</div>
                    {console.log(reno)}

                    
    

                    
                </div>
            )
        }else {
            return (
                <div>
                    <h4> A qtypeless question appeared in the wild</h4>
                </div>
                
            )
    
        }
    }else {
        return (
            <div>
                <h4> A typeless piece appeared in the wild</h4>
            </div>
            
        )
    } 
};

export default NormalRender;