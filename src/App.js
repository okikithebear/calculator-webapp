import './App.css';
import {useState, useEffect} from 'react'
import  {NumberFormatBase} from 'react-number-format';

function App() {
    const [previous, setPrevious] = useState('');
const [current, setCurrent] = useState('')
const [input, setInput] = useState('0');
const [operator, setOperator] = useState(null);
const [total, setTotal] = useState(false);
    const inputNumber = e =>{
      if(current.includes(".") && e.target.innerText === ".") return
     if(total){
        setPrevious('')
     } 
     current ? setCurrent((pre) => pre + e.target.innerText) : setCurrent(e.target.innerText)
     setTotal(false)
    };

    useEffect(() => {
    setInput(current)
    }, [current])
    useEffect(() => {
    setInput('')
    }, [])
    
    const equals = e =>{
    if(e?.target.innerText === '='){
    setTotal(true)
    }
    let cal
    switch (operator) {
        case '/':
            cal = String(parseFloat(previous) / parseFloat(current));
            break;
            case 'X':
                cal = String(parseFloat(previous) *  parseFloat(current));
                  break;
            case '+':
                cal = String(parseFloat(previous) + parseFloat(current));
                  break;
            case '-':
                cal = String(parseFloat(previous) - parseFloat(current));
                  break;
        default:
            return
    }

    setInput('');
    setPrevious(cal);
    setCurrent('');
    };

   
    const percent = e =>{
      previous
      ? setCurrent(String((parseFloat(current) / 100) * previous))
      : setCurrent(String(parseFloat(current) / 100));

    }
    
    const minusPlus = e =>{
      if (current.charAt(0) === "-") {
        setCurrent(current.substring(1));
      } else {
        setCurrent("-" + current);
      }
    }
    const reset = e =>{
     setCurrent('')
     setPrevious('')
     setInput('0')
    }
    const operatorType = (e) => {
        setTotal(false);
        setOperator(e.target.innerText);
        if (current === "") return;
        if (previous !== "") {
          equals();
        } else {
          setPrevious(current);
          setCurrent("");
        }
      };

 return(
    <div className='container'>
        <div className='wrapper'>
            <div className='screen'>{input !== '' || input === '0' ? (
            <NumberFormatBase
            value={input}
            displayType={"text"}
            thousandSeparator={true}
          />
        ) : (
          <NumberFormatBase
            value={previous}
            displayType={"text"}
            thousandSeparator={true}
          />
        )}
            </div>
            <div className='btn light-gray' onClick={reset}>AC</div>
            <div className='btn light-gray' onClick={percent}>%</div>
            <div className='btn light-gray' onClick={minusPlus}>+/-</div>
            <div className='btn orange' onClick={operatorType}>/</div>
            <div className='btn' onClick={inputNumber}>7</div>
            <div className='btn' onClick={inputNumber}>8</div>
            <div className='btn' onClick={inputNumber}>9</div>
            <div className='btn orange' onClick={operatorType}>X</div>
            <div className='btn' onClick={inputNumber}>4</div>
            <div className='btn' onClick={inputNumber}>5</div>
            <div className='btn' onClick={inputNumber}>6</div>
            <div className='btn orange' onClick={operatorType}>+</div>
            <div className='btn' onClick={inputNumber}>1</div>
            <div className='btn' onClick={inputNumber}>2</div>
            <div className='btn' onClick={inputNumber}>3</div>
            <div className='btn orange' onClick={operatorType}>-</div>
            <div className='btn zero' onClick={inputNumber}>0</div>
            <div className='btn' onClick={inputNumber}>.</div>
            <div className='btn' onClick={equals}>=</div>
        </div>
    </div>
    
 )
}

export default App;
