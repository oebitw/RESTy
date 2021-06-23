import { If, Then, Else } from 'react-if';
import Loading from 'react-loader-spinner';
import ReactJson from 'react-json-view';


import './results.scss';

function Results({ props }) {
  return (
    <section >
      <If condition={props.fetching}>
        <Then>
          <div id="loader">
            <h3>Loading...</h3>
            <Loading
              type="Bars"
              color="red"
              height={75}
              width={75}
            />
          </div>
        </Then>
        <Else>
          <If condition={props.headers}>
            <Then>
              <h2>Headers</h2>
              <ReactJson
                src={props.headers}
                name="Headers"
              />
              <h2>Response</h2>
              <ReactJson
                src={props.response}
                name="Response"
              />
            </Then>
            <Else>
              <h3> {props.response} </h3>
            </Else>
          </If>
        </Else>
      </If>
    </section>
  );
}

export default Results;