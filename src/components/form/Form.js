import React from 'react'
import './form.scss';
const superagent = require('superagent');




class Form extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            url: '',
            method: ''
        }
    }



    methodChangeHandler = e => {
        this.setState({ method: e.target.innerHTML });
    }


    handleSubmit = async (e) => {
        e.preventDefault();

        this.setState({
            url: e.target.url.value,
            method: this.state.method,
        });

        try {
            let bodyReq = e.target.body.value;
            const result = await superagent[this.state.method.toLowerCase()](
                e.target.url.value
            ).send(bodyReq)
            let { headers, body } = result;
            this.props.handler(headers, body, this.state);
        } catch (e) {
            console.log(e.message);
        }


    };

    render() {
        return (


            <form onSubmit={this.handleSubmit}>

                <div id="buttons">
                    <span
                        className={`button ${this.state.method === 'GET'}`}
                        onClick={this.methodChangeHandler}
                    >
                        GET
                    </span>
                    <span
                        className={`button ${this.state.method === 'POST'}`}
                        onClick={this.methodChangeHandler}
                    >
                        POST
                    </span>
                    <span
                        className={`button ${this.state.method === 'PUT'}`}
                        onClick={this.methodChangeHandler}
                    >
                        PUT
                    </span>
                    <span
                        className={`button ${this.state.method === 'DELETE'}`}
                        onClick={this.methodChangeHandler}
                    >
                        DELETE
                    </span>
                </div>

                <label>
                    URL:
                </label>

                <input
                    name="url"
                    type="text"
                    placeholder="ENTER: http://api.url"
                    required
                />

                <label>
                    Body Request:
                </label>

                <input type="text" name="body" placeholder="Enter the Request Body ..." />

                <button type="submit">{this.props.prompt}</button>



            </form>




        )
    }

}

export default Form
