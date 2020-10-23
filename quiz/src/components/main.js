import React, { useEffect, useState } from 'react';
import Navbar from './navbar';
import axios from 'axios';
import './quiz.css';

import { Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import Radio from '@material-ui/core/Radio';

const GreenRadio = withStyles({
  root: {
    color: green[400],
    '&$checked': {
      color: green[600],
    },
  },

  checked: {},
})((props) => <Radio color="default" {...props} />);

const Result = ({ per, correctAnswer, wrongAnswer }) => {
  if (isNaN(per)) {
    per = 0;
  }

  return (
    <div className="summary">
      <h1 className="head">Summary</h1>
      <div style={{ display: 'flex', flexDirection: 'column', margin: '2%' }}>
        {correctAnswer.map((val) => {
          return (
            <div>
              <h4>
                {val[0]} <span style={{ marginLeft: '2%' }}>{val[1]}</span>
                <span style={{ color: 'green', marginLeft: '3%' }}>
                  Correct
                </span>
              </h4>
            </div>
          );
        })}

        {wrongAnswer.map((val) => {
          return (
            <div>
              <h4>
                {val[0]} <span style={{ marginLeft: '2%' }}>{val[1]}</span>
                <span style={{ color: 'red', marginLeft: '3%' }}>
                  Incorrect
                </span>
              </h4>
            </div>
          );
        })}
      </div>

      <div>
        <h1 className="head">Your score is {Math.abs(per.toFixed(2))} %.</h1>
      </div>
    </div>
  );
};

let correctAnswer = [];
let wrongAnswer = [];

export default function Main() {
  const [value, setvalue] = useState([]);
  const [selectedValue, setSelectedValue] = React.useState('');
  const [count, setcount] = useState(0);
  const [bool, setBool] = useState(true);
  const [render, setrender] = useState(false);

  const handleChange = (e) => {
    e.preventDefault();
    setSelectedValue(e.target.value);
    setBool(false);
  };

  useEffect(() => {
    const fetch = async () => {
      const get = await axios.get('http://127.0.0.1:5000/getquestions');
      setvalue(get.data);
    };

    fetch();
  }, []);

  /* We can use objects with id to minimize our code and logic */

  const submit = () => {
    const getval = value[count];
    const filter = getval.values.filter((val) => val.value === true);

    if (selectedValue === filter[0].item) {
      /* find if option exist in wrong answer */
      /* remove options if exist..to remove duplicate of answers while selecting same opt. multiple times */
      const find = wrongAnswer.find((val) => val[0] !== filter[0].item);
      if (find) {
        wrongAnswer = wrongAnswer.filter(
          (val) => val[0] !== value[count].questions
        );
      }

      const same = correctAnswer.findIndex(
        (val) => val[0] === value[count].questions
      );
      if (same > -1) {
        correctAnswer.splice(same, 1);
      }
      correctAnswer.push([value[count].questions, selectedValue]);
      setBool(true);
    } else {
      /*find if option exist in correct answer*/
      const find = correctAnswer.find((val) => val[0] !== filter[0].item);

      if (find) {
        correctAnswer = correctAnswer.filter(
          (val) => val[0] !== value[count].questions
        );
      }

      const same = wrongAnswer.findIndex(
        (val) => val[0] === value[count].questions
      );
      if (same > -1) {
        wrongAnswer.splice(same, 1);
      }

      wrongAnswer.push([value[count].questions, selectedValue]);
      setBool(true);
    }

    if (count === value.length - 1) {
      setrender(true);
    }
  };

  const getPercentage = (a, b) => {
    return a / b;
  };

  let result = '';

  if (render) {
    const getPercent = getPercentage(correctAnswer.length, value.length) * 100;
    result = (
      <Result
        per={getPercent}
        correctAnswer={correctAnswer}
        wrongAnswer={wrongAnswer}
      />
    );
  }

  return (
    <div>
      <Navbar />
      <div className="main-container">
        <div className="main-wrapper">
          {count < value.length ? (
            <div>
              {value.length >= 1 ? (
                <div>
                  <div>
                    <h1 className="questions">{value[count].questions}</h1>
                  </div>

                  <div>
                    {value[count].values.map((val, i) => {
                      return (
                        <ul>
                          <li key={i} style={{ listStyle: 'none' }}>
                            <GreenRadio
                              checked={selectedValue === val.item}
                              name="radio-button-demo"
                              inputProps={{ 'aria-label': 'C' }}
                              value={val.item}
                              onChange={handleChange}
                            />
                            <span style={{ textTransform: 'capitalize' }}>
                              {val.item}
                            </span>
                          </li>
                        </ul>
                      );
                    })}
                  </div>
                  <Button
                    variant="contained"
                    color="primary"
                    type="button"
                    onClick={() => {
                      setcount(count - 1);
                      setBool(true);
                    }}
                    style={{ marginLeft: '0%' }}
                    disabled={count === 0 ? true : false}
                  >
                    Previous
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    type="button"
                    onClick={() => {
                      setcount(count + 1);
                      submit();
                    }}
                    style={{ marginLeft: '40%' }}
                    disabled={bool ? true : false}
                  >
                    {count < value.length - 1 ? 'Next' : 'Submit'}
                  </Button>
                </div>
              ) : (
                'Please add Questions'
              )}
            </div>
          ) : (
            ''
          )}
          {result}
        </div>
      </div>
    </div>
  );
}
