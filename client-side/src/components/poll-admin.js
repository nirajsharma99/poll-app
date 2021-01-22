import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faTrashAlt, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { faQrcode } from '@fortawesome/free-solid-svg-icons';
import QRCode from 'qrcode.react';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import queryString from 'query-string';
import Notification from './notification';
import randomColor from 'randomcolor';
import SocialShare from './social-share';

function PollAdmin({ location }) {
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState([{ id: '', options: '', count: 0 }]);
  const [key, setKey] = useState('');
  const [pollid, setPollid] = useState('');
  const [showQR, setShowQR] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [localkey, setLocalkey] = useState('');

  let totalvotes = 0;
  options.map((x) => {
    return (totalvotes += x.count);
  });
  const history = useHistory();
  const [toast, setToast] = useState({
    snackbaropen: false,
    msg: '',
    not: '',
  });
  const snackbarclose = (event) => {
    setToast({
      snackbaropen: false,
    });
  };
  //console.log('total votes', totalvotes);
  var cache = JSON.parse(localStorage.getItem(localkey));
  console.log(cache);
  useEffect(() => {
    setLocalkey(question.toLowerCase().trim().slice(0, 2) + pollid.slice(0, 4));
    if (cache != null && cache.id === pollid && cache.show === 0) {
      setToast({
        snackbaropen: true,
        msg: 'Thankyou for voting!',
        not: 'success',
      });
      localStorage.setItem(
        localkey,
        JSON.stringify({ id: cache.id, selected: cache.selected, show: 1 })
      );
    }
  });
  useEffect(() => {
    var x = queryString.parse(location.search);
    const id = x.id;
    setPollid(x.id);
    setKey(x.key);
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
        //console.log('options', options);
        //console.log('medium', medium);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  const deletePoll = () => {
    const data = { key: key };
    axios
      .post('http://localhost:5000/deletepoll', data)
      .then((res) => {
        console.log(res);
        alert('your poll was deleted');
        history.push('/');
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const ShowDelete = () => (
    <div
      className="w-100 justify-content-center d-flex align-items-center position-fixed fixed-top"
      style={{
        height: '100%',
        zIndex: 1,
        backgroundColor: 'rgba(135,206,235 ,0.7)',
      }}
    >
      <div
        className="d-flex flex-column align-items-center bg-white rounded-lg"
        style={{ width: '30%' }}
      >
        <div className="w-100 d-flex flex-column px-4 pt-4">
          <h5>Delete Poll</h5>
          <span className="text-secondary">
            Are you sure you want to delete the poll?
          </span>
          <div className="px-3 py-3 d-flex justify-content-end">
            <button
              className="border-light rounded-lg shadow-lg px-4 py-2 "
              onClick={() => setShowDelete(false)}
            >
              Cancel
            </button>
            <button
              className="bg-danger border-0 rounded-lg shadow-lg text-light px-4 py-2 ml-3"
              onClick={deletePoll}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
  const QR = () => (
    <div
      className="w-100 justify-content-center d-flex align-items-center position-fixed fixed-top"
      onClick={() => {
        setShowQR(false);
      }}
      style={{
        height: '100%',
        zIndex: 1,
        backgroundColor: 'rgba(135,206,235 ,0.7)',
      }}
    >
      <div className="d-flex flex-column align-items-center bg-white">
        <span className="font-weight-bold ">Scan QR Code</span>
        <QRCode
          value={`http://localhost:3000/poll/?id=${pollid}`}
          size={290}
          level={'H'}
          includeMargin={true}
        />
      </div>
    </div>
  );

  const ShowButton = () => (
    <a
      className="bg-success text-decoration-none font-weight-bold mb-5 px-2 py-4 rounded-lg text-center text-white "
      href={'/poll/?id=' + pollid}
    >
      Submit your vote
    </a>
  );
  const ShowSelection = () => (
    <span className="bg-info text-decoration-none font-weight-bold mb-5 px-2 py-3 rounded-lg text-center text-white ">
      You voted for {cache.selected}
    </span>
  );
  return (
    <div className="ui-outer">
      <div className="ui-container py-5">
        <div className="d-flex flex-column  flex-md-row justify-content-between align-items-md-center">
          <div className="d-flex flex-column mb-4 mb-md-0">
            <h2 className="heading-2">Manage your poll</h2>
            <p className="mt-4 text-secondary font-medium">
              You can only edit your poll if it has no votes!
            </p>
          </div>
          <div className="d-flex align-items-center mr-4 mr-md-4 justify-content-around justify-content-md-center">
            {totalvotes === 0 ? (
              <a
                aria-label="Edit Poll?"
                href={'/edit-poll/?id=' + pollid + '&key=' + key}
                className="text-primary-dark p-2 outline-none rounded hover-shadow text-warning border-0 bg-transparent"
                style={{ fontSize: '1.5rem' }}
              >
                <FontAwesomeIcon icon={faPencilAlt} />
              </a>
            ) : null}

            <button
              aria-label={'Delete Poll?'}
              role="alert"
              className="text-primary-dark p-2 outline-none rounded hover-shadow text-danger border-0 bg-transparent"
              style={{ fontSize: '1.5rem' }}
              onClick={() => setShowDelete(true)}
            >
              <FontAwesomeIcon icon={faTrashAlt} />
            </button>
          </div>
        </div>
        <div className="mb-5 mb-md-5 pb-md-0 my-4">
          <h2 className=" mb-5 heading">{question}</h2>
          <div className="d-flex flex-md-row flex-column ">
            <div className="d-flex w-100 col-12 col-md-8 flex-column">
              <div style={{ position: 'relative' }}>
                <div>
                  {options.map((x, index) => (
                    <div
                      className="py-0 bg-white px-3  rounded-lg shadow-lg position-relative"
                      key={index}
                    >
                      <div className="d-flex justify-content-between">
                        <div className="d-flex align-items-center">
                          <h2 className=" font-weight-bold text-primary-dark">
                            {x.options}
                          </h2>
                        </div>
                        <div className=" ">
                          <h2 className=" font-weight-bold text-primary-dark">
                            {((x.count / totalvotes) * 100).toFixed(0)}%
                          </h2>
                        </div>
                      </div>
                      <div className="w-100 rounded-lg ">
                        <div
                          className="rounded-lg d-block mt-3"
                          style={{
                            width: `${(x.count / totalvotes) * 100}%`,
                            height: '0.5rem',
                            backgroundColor: `${randomColor()}`,
                          }}
                        ></div>
                      </div>
                      <p className="mt-3 text-green">{x.count} Votes</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="d-flex flex-column w-100 col-12 col-md-4 mb-0 rounded-lg ">
              <Notification
                switcher={toast.snackbaropen}
                close={snackbarclose}
                message={toast.msg}
                nottype={toast.not}
              />
              {cache != null ? (
                cache.id === pollid ? (
                  <ShowSelection />
                ) : (
                  <ShowButton />
                )
              ) : (
                <ShowButton />
              )}
              <div className="w-100 bg-white d-flex flex-column border-t border-gray-300 border-top-0 rounded-lg self-start px-3 py-3 ">
                <div className="d-flex flex-column justify-content-between">
                  <div className="">
                    <p className="font-weight-normal text-secondary text-left mb-0 text-sm lg:text-base">
                      Total Votes
                    </p>
                    <h3 className="count font-weight-bold text-primary-dark">
                      {totalvotes}
                    </h3>
                  </div>
                  <div className="d-flex flex-row flex-md-column justify-content-center">
                    <p className="font-weight-bold d-none d-md-inline-block mt-2 mb-4 text-primary-secondary text-left">
                      Share
                    </p>
                    <button
                      className="bg-warning font-weight-bold mb-4 px-0 py-2 rounded-lg text-center border-0 text-white mr-3 "
                      onClick={() => {
                        setShowQR(true);
                      }}
                    >
                      <FontAwesomeIcon className="ml-3 mr-3" icon={faQrcode} />
                      <snap className="d-none d-md-inline-block ">
                        Share via QRcode
                      </snap>
                    </button>
                    <SocialShare
                      url={'http://localhost:3000/poll/?id=' + pollid}
                      question={question}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showDelete ? <ShowDelete /> : null}
      {showQR ? <QR /> : null}
    </div>
  );
}
export default PollAdmin;
