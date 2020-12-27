import * as React from 'react';

type InputNumber = {
    number: number,
    id: number
};

export const App = () => {
    const [inputs, setInputs] = React.useState([]);
    const [numbers, setNumbers] = React.useState<Array<InputNumber>>([]);
    const [sum, setSum] = React.useState<number>(0);
    const [idCount, setIdCount] = React.useState<number>(0);

    const addNumber = (value: number): void => {
        let newNumbers = [{id: idCount, number: value}, ...numbers];
        setIdCount(idCount + 1);
        setNumbers(newNumbers);
    };

    const updateNumber = (index: number, value: number): void => {
        let newNumbers = [...numbers];
        newNumbers[index] = {id: newNumbers[index].id, number: value};
        setNumbers(newNumbers);
    };

    const removeNumber = (index: number): void => {
        let newNumbers = [...numbers];
        newNumbers.splice(index, 1);
        setNumbers(newNumbers);
    };

    const updateSum = (): void => {
        if (numbers === undefined || numbers.length == 0) {
            setSum(0);
        } else {
            setSum(numbers.map(i => i.number).reduce((a, b) => a + b));
        }
    };

    const updateItems = (): void => {
        const newItems = [];
        for (const [index, {id, number}] of numbers.entries()) {
            newItems.push(
                <div key={id}>
                    <input type='number' min='0' defaultValue={number} onChange={(e) => updateNumber(index, parseInt(e.target.value))}/>
                    <button type='button' onClick={(e) => removeNumber(index)}>Delete</button>
                </div>
            );
        }
        setInputs(newItems);
    };

    React.useEffect(() => {
        addNumber(0);
    }, []);

    React.useEffect(() => {
        updateItems();
        updateSum();
    }, [numbers]);

    return (
        <>
            <div>
                Sum = {sum}
            </div>
            <button type='button' onClick={(e) => addNumber(0)}>Add Number</button>
            {inputs}
        </>
    );
};
