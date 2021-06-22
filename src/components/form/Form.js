import React from 'react'
import './form.scss';


class Form extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            url: '',
            method: '',
            body: '',
        }
    }



    methodChangeHandler = e => {
        this.setState({ method: e.target.innerHTML });
    }


    handleSubmit = async (e) => {
        e.preventDefault();

        await this.setState({
            url: e.target.url.value,
            method: this.state.method,
            body: e.target.body.value,

        });

        this.props.handler(this.state);

    };

    render() {
        return (


            <form onSubmit={this.handleSubmit}>

                <div id="buttons">
                    <span
                        id="GET"
                        className={`button ${this.state.method === 'GET'}`}
                        onClick={this.methodChangeHandler}
                    >
                        GET
                    </span>
                    <span
                        id="POST"
                        className={`button ${this.state.method === 'POST'}`}
                        onClick={this.methodChangeHandler}
                    >
                        POST
                    </span>
                    <span
                        id="PUT"
                        className={`button ${this.state.method === 'PUT'}`}
                        onClick={this.methodChangeHandler}
                    >
                        PUT
                    </span>
                    <span
                        id="DELETE"
                        className={`button ${this.state.method === 'DELETE'}`}
                        onClick={this.methodChangeHandler}
                    >
                        DELETE
                    </span>
                </div>



                <input
                    name="url"
                    type="text"
                    placeholder="ENTER URL: http://api.url"
                    id="url"
                    required
                />

                <br></br>

                <textarea
                    type="text"
                    name="body"
                    placeholder="Enter the Request body"
                    rows="10"
                    cols="40"
                    id="body"
                />

                <br></br>

                <button type="submit">{this.props.prompt}</button>

            </form>




        )
    }

}

export default Form
