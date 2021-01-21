import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import queryString from 'query-string';
import { Link, useHistory } from 'react-router-dom';
import PollResult from './poll-result';
import Notification from './notification';

function Poll({ location }) {
  const history = useHistory();
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState([{ id: '', options: '', count: 0 }]);
  const [pollid, setPollid] = useState('');
  const [response, setResponse] = useState({
    id: '',
    options: '',
    count: 0,
  });
  const [toast, setToast] = useState({
    snackbaropen: false,
    msg: '',
    not: '',
  });
  const [verifier, setVerifier] = useState({ id: '', selected: '', show: 0 });
  //console.log(response);
  const snackbarclose = (event) => {
    setToast({
      snackbaropen: false,
    });
  };
  useEffect(() => {
    var cache = JSON.parse(localStorage.getItem('verifier'));
    console.log(cache);
    if (cache === null) {
      console.log('on track');
    } else {
      if (cache.id === pollid) {
        history.push('/poll-result/?id=' + pollid);
      }
    }
  });

  useEffect(() => {
    var x = queryString.parse(location.search);
    const id = x.id;
    setPollid(id);
    //console.log(id);

    axios
      .get(`http://localhost:5000/getpoll/${id}`)
      .then(function (response) {
        let medium = [];
        const data = response.data;
        console.log(data);
        setQuestion(data.question);
        data.options.map((option) => {
          medium.push(option);
          return medium;
        });
        setOptions(medium);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  function settingResponse({ option }) {
    setResponse({
      id: option.id,
      options: option.options,
      count: option.count + 1,
      pollid: pollid,
    });
    setVerifier({ id: pollid, selected: option.options, show: 0 });

    console.log('newresponse', response);
    //settingVerifier(response);
    console.log(verifier);
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    if (response.options.length > 0) {
      e.preventDefault();
      setToast({
        snackbaropen: true,
        msg: 'Thankyou for your vote!, vote submitted!',
        not: 'success',
      });
      localStorage.setItem('verifier', [JSON.stringify(verifier)]);
      console.log('submitting', response);
      //settingVerifier(response);
      console.log('submitting-verfier', verifier);
      axios
        .post('http://localhost:5000/submitresponse', response)
        .then(function (res) {
          console.log(res);
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      setToast({
        snackbaropen: true,
        msg: 'Please, select a option!',
        not: 'error',
      });
    }
  };

  return (
    <div className="ui-outer">
      <div className="ui-container py-5 px-5">
        <div>
          <h2 className=" mb-5 heading">{question}</h2>
          <div className="flex flex-column w-75 mr-auto ml-auto">
            <form>
              {options.map((option) => (
                <div
                  className="py-3 w-100 mb-4 shadow-lg hover-zoom px-2  rounded bg-white  radio-label"
                  key={option.id}
                >
                  <div className="d-flex align-items-center">
                    <input
                      type="radio"
                      id={option.id}
                      name="option"
                      value={option.options}
                      checked={response.options === option.options}
                      onChange={() => settingResponse({ option })}
                      className="d-inline-block ml-3 mr-3"
                    />
                    <label htmlFor={option.id} className="w-100">
                      <h4 className=" font-weight-bold  text-primary-dark d-inline-block">
                        {option.options}
                      </h4>
                    </label>
                  </div>
                </div>
              ))}
              <Notification
                switcher={toast.snackbaropen}
                close={snackbarclose}
                message={toast.msg}
                nottype={toast.not}
              />

              <div className="mt-5 d-flex flex-column flex-md-row">
                <div className="col-0 col-md-8">
                  <button
                    type="submit"
                    onClick={handleSubmit}
                    className="focus-outline-none py-3 font-weight-bold focus-shadow w-50 bg-success border-0 text-white px-2 shadow-lg hover-shadow-lg rounded-lg"
                  >
                    Submit your vote
                  </button>
                </div>
                <div className="col-0 col-md-4 ">
                  <Link to={'/poll-result/?id=' + pollid}>
                    <h5 className=" display-8 float-right text-secondary font-weight-normal">
                      View Results <FontAwesomeIcon icon={faChevronRight} />
                    </h5>
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Poll;
