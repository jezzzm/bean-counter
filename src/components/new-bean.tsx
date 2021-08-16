import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { MutateBean, Roaster } from '../types';

const isCompleteBean = (bean: MutateBean): bean is MutateBean => {
  return !!(bean.roasterName && bean.name);
};

const initialNewBean: MutateBean = {
  roasterName: '',
  name: '',
  description: undefined,
};

type Props = {
  onSubmit: (newBean: MutateBean) => void;
};

const NewBean: React.FC<Props> = ({ onSubmit }) => {
  const [newBean, setNewBean] = useState<MutateBean>(initialNewBean);
  const { data: roasters = [] } = useQuery<Roaster[]>('roasters', () =>
    fetch('http://localhost:3001/roasters').then((res) => res.json())
  );

  const handleNewBeanChange = ({
    target,
  }: {
    target: HTMLInputElement | HTMLSelectElement;
  }) => {
    setNewBean((existing) => ({
      ...existing,
      [target.name]: target.value,
    }));
  };

  const addNewBean = () => {
    if (isCompleteBean(newBean)) {
      onSubmit(newBean);
      setNewBean(initialNewBean);
    }
  };

  return (
    <div className="app-form">
      <h3>New Bean</h3>
      <select
        value={newBean.roasterName}
        onChange={handleNewBeanChange}
        name="roasterName"
      >
        {roasters.map((roaster) => (
          <option key={`new-bean-${roaster.name}`} value={roaster.name}>
            {roaster.name}
          </option>
        ))}
      </select>
      <input
        value={newBean.name}
        name="name"
        onChange={handleNewBeanChange}
        placeholder="Bean Name"
      />
      <input
        value={newBean.description}
        name="description"
        onChange={handleNewBeanChange}
        placeholder="Description"
      />
      <button
        type="button"
        onClick={addNewBean}
        className="app-form-submit"
        disabled={!isCompleteBean(newBean)}
      >
        Add Bean
      </button>
    </div>
  );
};

export default NewBean;
