import React, { useState } from 'react';
import './app.css';
import BeanTable from './components/bean-table';
import NewBean from './components/new-bean';
import NewGrinder from './components/new-grinder';

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
];

export type Grinder = typeof grinders[number];

export type MyGrinder = {
  nickname: string;
  datePurchased: string;
} & Grinder;

export type Bean = {
  brand: string;
  name: string;
  dose: number;
  grindSize: string;
  basket: 'single' | 'double';
  comment?: string;
};

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

const initialNewConfig = {};

function App() {
  const [configs, setConfigs] = useState<Config[]>([]);
  const [newConfig, setNewConfig] = useState<Config>();

  const [myGrinders, setMyGrinders] = useState<MyGrinder[]>([]);
  const [myBeans, setMyBeans] = useState<Bean[]>([]);

  return (
    <div className="app">
      <div className="app-wrapper">
        <header className="app-header">
          <div className="app-forms-container">
            <NewGrinder
              grinders={grinders}
              onSubmit={(newGrinder) => {
                setMyGrinders((existing) => [...existing, newGrinder]);
              }}
            />
            <NewBean onSubmit={(newBean) => {
              setMyBeans((existing) => [...existing, newBean]);
            }} />
          </div>
        </header>
        <div className="tables-container">

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
          <BeanTable beans={myBeans} />
        </div>
          
      </div>
    </div>
  );
}

export default App;
