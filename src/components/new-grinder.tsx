import React, { useState } from 'react';
import { Grinder, MyGrinder } from '../app';

type AnyString<T> = { [P in keyof T]: string };

const isCompleteGrinder = (
  grinder: AnyString<MyGrinder>
): grinder is MyGrinder => {
  const cast = grinder as MyGrinder;
  return !!(cast.model && cast.make && cast.datePurchased && cast.nickname);
};

const initialNewGrinder = {
  nickname: '',
  make: '',
  model: '',
  date: '',
  datePurchased: '',
};

type Props = {
  onSubmit: (newGrinder: MyGrinder) => void;
  grinders: Grinder[];
};

const NewGrinder: React.FC<Props> = ({ onSubmit, grinders }) => {
  const [newGrinder, setNewGrinder] =
    useState<AnyString<MyGrinder>>(initialNewGrinder);

  const handleNewGrinderChange = ({
    target,
  }: {
    target: HTMLInputElement | HTMLSelectElement;
  }) => {
    setNewGrinder((existing) => ({
      ...existing,
      [target.name]: target.value,
    }));
  };

  const addNewGrinder = () => {
    if (isCompleteGrinder(newGrinder)) {
      onSubmit(newGrinder);
      setNewGrinder(initialNewGrinder);
    }
  };

  return (
    <div className="app-form">
      <h3>New Grinder</h3>
      <input
        value={newGrinder.nickname}
        name="nickname"
        onChange={handleNewGrinderChange}
        placeholder="Nickname"
      />
      <select
        value={newGrinder.make}
        onChange={handleNewGrinderChange}
        name="make"
      >
        <option value={undefined}>Select Make</option>
        {grinders
          .map((grinder) => grinder.make)
          .filter((val, index, self) => self.indexOf(val) === index)
          .sort()
          .map((make) => (
            <option key={make} value={make}>
              {make}
            </option>
          ))}
      </select>
      <select
        value={newGrinder.model}
        onChange={handleNewGrinderChange}
        name="model"
      >
        <option value={undefined}>Select Model</option>
        {grinders
          .filter((grinder) => grinder.make === newGrinder.make)
          .map((grinder) => grinder.model)
          .sort()
          .map((model) => (
            <option key={model} value={model}>
              {model}
            </option>
          ))}
      </select>
      <input
        value={newGrinder.datePurchased}
        type="date"
        name="datePurchased"
        onChange={handleNewGrinderChange}
        placeholder="datePurchased"
      />

      <button
        type="button"
        onClick={addNewGrinder}
        className="app-form-submit"
        disabled={!isCompleteGrinder(newGrinder)}
      >
        Add Grinder
      </button>
    </div>
  );
};

export default NewGrinder;
