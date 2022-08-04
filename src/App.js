import React, { useState } from "react";
import { Row, Input, Button, List, Typography } from "antd";
import './App.css'

const calculationTypes = {
  PLUS: "PLUS",
  SUBSTRACT: "SUBSTRACT",
  DIVIDE: "DIVIDE",
  MULTIPLY: "MULTIPLY"
}

const App = () => {
  const [total, setTotal] = useState(0)
  const [input, setInput] = useState("")
  const [history, setHistory] = useState([])
  const [error, setErr] = useState("")

  const handleChange = (event) => {
    if (event.target.value !== "") {
      setInput(parseInt(event.target.value))
      setErr(false)
    } else {
      setInput("")
      setErr("Please enter value")
    }
  }

  const handleCalculation = (type) => {
    if (input !== "") {
      let newTotal = 0
      switch (type) {
        case calculationTypes.PLUS:
          newTotal = total + input;
          setTotal(newTotal)
          history.push(`${total} + ${input} = ${newTotal}`)
          setHistory([...history])
          setInput("")
          return;
        case calculationTypes.SUBSTRACT:
          newTotal = total - input;
          setTotal(newTotal)
          history.push(`${total} - ${input} = ${newTotal}`)
          setHistory([...history])
          setInput("")
          return;
        case calculationTypes.MULTIPLY:
          newTotal = total * input;
          setTotal(newTotal)
          history.push(`${total} * ${input} = ${newTotal}`)
          setHistory([...history])
          setInput("")
          return;
        case calculationTypes.DIVIDE:
          if (input !== 0) {
            newTotal = total / input;
            setTotal(newTotal)
            history.push(`${total} / ${input} = ${newTotal}`)
            setHistory([...history])
            setInput("")
          }
          else {
            setErr("Please enter a value other than 0")
          }
          return;
        default:
          return;
      }
    } else {
      setErr("Please enter value")
    }

  }

  return (
    <>
      <div className={`count mt-10 ${total < 0 && 'red-count'}`}>{total}</div>
      <Row justify="center">
        <Input value={input} className="input" placeholder="please enter your input" type="number" onChange={handleChange} />
      </Row>
      {error && <div className="error-message">{error}</div>}
      <Row className="mt-10" justify="center">
        <Button size="large" className="ml-5 mr-5 br-10" type="primary" onClick={() => handleCalculation(calculationTypes.PLUS)}>Add</Button>
        <Button size="large" className="ml-5 mr-5 br-10" type="primary" onClick={() => handleCalculation(calculationTypes.SUBSTRACT)}>Subtract</Button>
        <Button size="large" className="ml-5 mr-5 br-10" type="primary" onClick={() => handleCalculation(calculationTypes.MULTIPLY)}>Multiply</Button>
        <Button size="large" className="ml-5 mr-5 br-10" type="primary" onClick={() => handleCalculation(calculationTypes.DIVIDE)}>Divide</Button>
      </Row>
      <div className="history-title mt-15 mb-10">History of calculations</div>
      <Row className="mt-10" justify="center">
        <List className="list" bordered dataSource={history} renderItem={item => (
          <List.Item>
            <Typography.Text>
              {item}
            </Typography.Text>
          </List.Item>
        )} />
      </Row>
    </>
  );
}

export default App;
