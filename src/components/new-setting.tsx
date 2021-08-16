import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { QueryBean, QueryModel, MutateSetting } from '../types';

const isCompleteSetting = (setting: MutateSetting): setting is MutateSetting => {
  return !!(
    setting.beanId  && setting.beanId > 0 &&
    setting.modelId && setting.modelId > 0 &&
    setting.dose > 0 &&
    setting.grindSize &&
    setting.basket
  );
};

const initialNewSetting: MutateSetting = {
  dose: 18,
  grindSize: '',
  basket: 'double',
  modelId: undefined,
  beanId: undefined,
  comment: undefined,
};

type Props = {
  onSubmit: (newSetting: MutateSetting) => void;
};

const NewSetting: React.FC<Props> = ({ onSubmit }) => {
  const [newSetting, setNewSetting] = useState<MutateSetting>(initialNewSetting);

    const { data: beans = [] } = useQuery<QueryBean[]>('beans', () =>
    fetch('http://localhost:3001/beans').then((res) => res.json())
    );
  
    const {
    data: grinders = [],
  } = useQuery<QueryModel[]>('grinders', () =>
    fetch('http://localhost:3001/grinders').then((res) => res.json())
  );

  const handleNewSettingChange = ({
    target,
  }: {
    target: HTMLInputElement | HTMLSelectElement;
  }) => {
    setNewSetting((existing) => ({
      ...existing,
      [target.name]: target.value,
    }));
  };

  const addNewSetting = () => {
    const withDoseAsNumber = {...newSetting, dose: Number(newSetting.dose)}
    if (isCompleteSetting(withDoseAsNumber)) {
      onSubmit(withDoseAsNumber);
      setNewSetting(initialNewSetting);
    }
  };

  return (
    <div className="app-form">
      <h3>New Setting</h3>
    <select
      value={newSetting.beanId}
      onChange={handleNewSettingChange}
      name="beanId"
    >
      {beans.map((bean) => (
        <option key={`new-setting-${bean.id}-${bean.name}`} value={bean.id}>
          {bean.roasterName} {bean.name}
        </option>
      ))}
    </select>
    <select
      value={newSetting.modelId}
      onChange={handleNewSettingChange}
      name="modelId"
    >
      {grinders.map((model) => (
        <option key={`new-setting-${model.id}-${model.name}`} value={model.id}>
          {model.makeName} {model.name}
        </option>
      ))}
    </select>
      <input
        value={newSetting.dose}
        type="number"
        name="dose"
        onChange={handleNewSettingChange}
        placeholder="Dose"
      />
      <input
        value={newSetting.grindSize}
        name="grindSize"
        onChange={handleNewSettingChange}
        placeholder="Grind Size"
      />
      <select
        value={newSetting.basket}
        onChange={handleNewSettingChange}
        name="basket"
      >
        <option value="single">Single</option>
        <option value="double" defaultChecked>
          Double
        </option>
      </select>
      <input
        value={newSetting.comment}
        name="comment"
        onChange={handleNewSettingChange}
        placeholder="Comment"
      />

      <button
        type="button"
        onClick={addNewSetting}
        className="app-form-submit"
        disabled={!isCompleteSetting(newSetting)}
      >
        Add Setting
      </button>
    </div>
  );
};

export default NewSetting;
