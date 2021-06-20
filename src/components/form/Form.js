import React from 'react'
import './form.scss';



class Form extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            url: '',
            method: ''
        }
    }

    inputChangeHandler = e => {
        this.setState({ input: e.target.value })
    }

    urlHandler = () => {
        this.setState({
            url: this.state.input,
            method: this.state.restMethod
        })
    }

    methodChangeHandler = e => {
        this.setState({ restMethod: e.target.innerHTML });
    }




    render() {
        return (
            <main>

                <form>

                    <label>
                        URL:
                    </label>

                    <input
                        name="url"
                        type="text"
                        placeholder="ENTER: http://api.url"
                        onChange={this.inputChangeHandler}
                        required
                    />

                    <button type="button" onClick={this.urlHandler}>
                        GO!
                    </button>

                    <div id="buttons">
                        <span
                            className={`button ${this.state.restMethod === 'GET'}`}
                            onClick={this.methodChangeHandler}
                        >
                            GET
                        </span>
                        <span
                            className={`button ${this.state.restMethod === 'POST'}`}
                            onClick={this.methodChangeHandler}
                        >
                            POST
                        </span>
                        <span
                            className={`button ${this.state.restMethod === 'PUT'}`}
                            onClick={this.methodChangeHandler}
                        >
                            PUT
                        </span>
                        <span
                            className={`button ${this.state.restMethod === 'DELETE'}`}
                            onClick={this.methodChangeHandler}
                        >
                            DELETE
                        </span>
                    </div>

                </form>

                <section id="result">
                    <table>
                        <tr>
                            <th>URL</th>
                            <th >Method</th>
                        </tr>
                        <tr>
                            <td>{this.state.url}</td>
                            <td>{this.state.method}</td>
                        </tr>
                    </table>
                </section>
            </main>
        )
    }

}

export default Form
