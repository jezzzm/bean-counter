import React, { useState } from 'react';
import './app.css';

const grinders = [
  {
    make: 'Breville',
    model: 'Built-in',
  },
  {
    make: 'Breville',
    model: 'Smart Grinder Pro',
  },
  {
    make: 'Baratza',
    model: 'Sette 270',
  },
  {
    make: 'Baratza',
    model: 'Encore',
  },
  {
    make: 'Wellhome',
    model: 'ZD-10T',
  },
] as const;

type Grinder = typeof grinders[number];

type MyGrinder = {
  nickname: string;
  datePurchased: string;
} & Grinder;

type AnyString<T> = { [P in keyof T]: string };

interface Config {
  myGrinder: MyGrinder;
  bean: {
    brand: string;
    name: string;
    comment: string;
  };
  settings: {
    dose: number; // grams
    basket?: 'single' | 'double';
    size: string;
    notes?: string;
  };
}

// select grinder

// no grinder? add one

// input bean info

// input grind setting info

// save

// append to list

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

const initialNewConfig = {};

function App() {
  const [configs, setConfigs] = useState<Config[]>([]);
  const [newConfig, setNewConfig] = useState<Config>();
  const [newGrinder, setNewGrinder] =
    useState<AnyString<MyGrinder>>(initialNewGrinder);
  const [myGrinders, setMyGrinders] = useState<MyGrinder[]>([]);

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
      setMyGrinders((prev) => [...prev, newGrinder]);
      setNewGrinder(() => initialNewGrinder);
    }
  };

  return (
    <div className="app">
      <div className="app-wrapper">
      <header className="app-header">
        <div className="app-forms-container">

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

          <button type="button" onClick={addNewGrinder} className="app-form-submit" disabled={!isCompleteGrinder(newGrinder)}>
            Add Grinder
          </button>
        </div>
        <div className="app-form">
          <h3>Add Bean</h3>
          </div>
        </div>
          
      </header>
      <table className="my-grinders-table">
        <thead>
          <tr>
            <th>Nickname</th>
            <th>Make</th>
            <th>Model</th>
            <th>Date Purchased</th>
          </tr>
        </thead>
        <tbody>
          {myGrinders.map((grinder) => (
            <tr key={grinder.nickname}>
              <td>{grinder.nickname}</td>
              <td>{grinder.make}</td>
              <td>{grinder.model}</td>
              <td>{grinder.datePurchased}</td>
            </tr>
          ))}
        </tbody>
        </table>
        </div>
    </div>
  );
}

export default App;
