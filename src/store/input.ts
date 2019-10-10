import { useState } from 'react';

export const useInputValue = (initialValue = '') => {
  const [inputValue, setInputValue] = useState(initialValue)

  return {
    inputValue,
    changeInput: (event: React.ChangeEvent<HTMLInputElement>) => setInputValue(event.currentTarget.value),
    clearInput: () => setInputValue(''),
    keyInput: (event: React.KeyboardEvent<HTMLInputElement>) => {
      return (event.which === 13 || event.keyCode === 13)
    }
  }
}
