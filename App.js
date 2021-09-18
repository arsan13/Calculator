import React, {useState} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';

const App = () => {
  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');
  const [operand, setOperand] = useState('');
  const [calculation, setCalculation] = useState('');
  const [history, setHistory] = useState('');

  const handlePress = input => {
    if (Number.isInteger(input)) {
      if (operand == '') {
        let temp = num1 == '' ? input : num1 * 10 + input;
        setNum1(temp);
      } else {
        let temp = num2 == '' ? input : num2 * 10 + input;
        setNum2(temp);
      }
    } else if (input == 'C') {
      setNum1('');
      setNum2('');
      setOperand('');
      setCalculation('');
    } else if (input == '=') {
      setNum1(calculate());
      setNum2('');
    } else {
      if (num2 != '') {
        setNum1(calculate());
        setNum2('');
      }
      setOperand(input);
    }
  };

  const calculate = () => {
    let res = num1 + ' ' + operand + ' ' + num2;
    let hist = hist + '\n' + '------' + '\n' + res;
    setHistory(hist);
    setCalculation(res);
    switch (operand) {
      case '+':
        return num1 + num2;
      case '-':
        return num1 - num2;
      case '*':
        return num1 * num2;
      case '/':
        return num1 / num2;
    }
  };

  let rows = [];
  const nums = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    ['C', 0, '='],
  ];
  for (let i = 0; i < 4; i++) {
    let row = [];
    for (let j = 0; j < 3; j++) {
      row.push(
        <TouchableOpacity
          onPress={() => handlePress(nums[i][j])}
          style={styles.btn}>
          <Text style={styles.btnText}>{nums[i][j]}</Text>
        </TouchableOpacity>,
      );
    }
    rows.push(<View style={styles.row}>{row}</View>);
  }

  const operations = ['+', '-', '*', '/'];
  let ops = [];
  for (let k = 0; k < 4; k++) {
    ops.push(
      <TouchableOpacity
        onPress={() => handlePress(operations[k])}
        style={styles.btn}>
        <Text style={styles.btnText}>{operations[k]}</Text>
      </TouchableOpacity>,
    );
  }

  return (
    <View style={styles.container}>
      <Button title="History" onPress={() => setCalculation(history)} />
      <View style={styles.calculation}>
        <Text style={styles.calculationText}>{calculation}</Text>
      </View>
      <View style={styles.result}>
        <Text style={styles.resultText}>
          {num1} {operand} {num2}
        </Text>
      </View>
      <View style={styles.buttons}>
        <View style={styles.numbers}>{rows}</View>
        <View style={styles.operations}>{ops}</View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  calculation: {
    flex: 2,
    backgroundColor: '#e5e8e8',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  calculationText: {
    fontSize: 30,
    color: 'black',
  },
  result: {
    flex: 1,
    backgroundColor: '#aeb6bf',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  resultText: {
    fontSize: 24,
    color: 'black',
  },
  buttons: {
    flexGrow: 7,
    flexDirection: 'row',
  },
  numbers: {
    flex: 3,
    backgroundColor: '#2c3e50',
  },
  operations: {
    flex: 1,
    backgroundColor: '#148f77',
    justifyContent: 'space-around',
    alignItems: 'stretch',
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  btn: {
    flex: 1,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    color: 'white',
    fontSize: 24,
    fontWeight: '400',
  },
});

export default App;
