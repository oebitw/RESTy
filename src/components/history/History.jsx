
//================================================//
// This is the History Component in the Home Page//
//==============================================//



////////////////////
//// Imports //////
//////////////////

// React
import React from 'react';

//Styles
import './history.scss';


//////////////////////////
////History Component ///
////////////////////////

function History({ props,handler }) {
    return (
        <section id="history">
            <table>
                <thead>
                    <tr>
                        <th>Method</th>
                        <th>URL</th>
                    </tr>
                </thead>
                <tbody>
                    {props.map((val, i) => {
                        return (
                            <tr
                                key={i + val.method + val.url + val.body}
                                onClick={handler}
                            >
                                <th  id={`his${val.method}`}>{val.method}</th>
                                <td>{val.url}</td>
                                <td style={{ display: 'none' }}>{val.body}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </section>
    );
}

export default History
