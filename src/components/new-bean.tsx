import React, { useState } from 'react';
import { Bean, Grinder, MyGrinder } from '../app';

type AnyString<T> = { [P in keyof T]: string };

const isCompleteBean = (bean: Bean): bean is Bean => {
  return !!(
    bean.brand &&
    bean.name &&
    bean.dose &&
    bean.grindSize &&
    bean.basket
  );
};

const initialNewBean: Bean = {
  brand: '',
  name: '',
  dose: 18,
  grindSize: '',
  basket: 'double',
  comment: '',
};

type Props = {
  onSubmit: (newBean: Bean) => void;
};

const NewBean: React.FC<Props> = ({ onSubmit }) => {
  const [newBean, setNewBean] = useState<Bean>(initialNewBean);

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
    const withDoseAsNumber = {...newBean, dose: Number(newBean.dose)}
    if (isCompleteBean(withDoseAsNumber)) {
      onSubmit(withDoseAsNumber);
      setNewBean(initialNewBean);
    }
  };

  return (
    <div className="app-form">
      <h3>New Bean</h3>
      <input
        value={newBean.brand}
        name="brand"
        onChange={handleNewBeanChange}
        placeholder="Brand"
      />
      <input
        value={newBean.name}
        name="name"
        onChange={handleNewBeanChange}
        placeholder="Name"
      />
      <input
        value={newBean.dose}
        type="number"
        name="dose"
        onChange={handleNewBeanChange}
        placeholder="Dose"
      />
      <input
        value={newBean.grindSize}
        name="grindSize"
        onChange={handleNewBeanChange}
        placeholder="Grind Size"
      />
      <select
        value={newBean.basket}
        onChange={handleNewBeanChange}
        name="basket"
      >
        <option value="single">Single</option>
        <option value="double" defaultChecked>
          Double
        </option>
      </select>
      <input
        value={newBean.comment}
        name="comment"
        onChange={handleNewBeanChange}
        placeholder="Comment"
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
