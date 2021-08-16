import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { MutateModel, QueryModel } from '../types';

const isCompleteGrinder = (grinder: MutateModel): grinder is MutateModel => {
  return !!(grinder.makeName && grinder.name);
};

const isUniqueGrinder = (grinder: MutateModel, allGrinders: MutateModel[]) => {
  return (
    allGrinders.filter(
      ({ name, makeName }) =>
        makeName === grinder.makeName && grinder.name === name
    ).length > 0
  );
};

const initialNewGrinder: MutateModel = {
  makeName: '',
  name: '',
};

type Props = {
  onSubmit: (newGrinder: MutateModel) => void;
};

const NewGrinder: React.FC<Props> = ({ onSubmit }) => {
  const [newGrinder, setNewGrinder] = useState<MutateModel>(initialNewGrinder);
  const {
    isError,
    isLoading,
    data: grinders = [],
  } = useQuery<QueryModel[]>('grinders', () =>
    fetch('http://localhost:3001/grinders').then((res) => res.json())
  );

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
    if (
      isCompleteGrinder(newGrinder) &&
      isUniqueGrinder(newGrinder, grinders)
    ) {
      onSubmit(newGrinder);
      setNewGrinder(initialNewGrinder);
    }
  };

  return (
    <div className="app-form">
      <h3>New Grinder</h3>
      {(() => {
        if (isLoading) {
          return 'Loading...';
        }
        if (isError) {
          return 'Error...';
        }
        return (
          <>
            <select
              value={newGrinder.makeName}
              onChange={handleNewGrinderChange}
              name="make"
            >
              <option value={undefined}>Select Make</option>
              {grinders
                .map((grinder) => grinder.makeName)
                .filter((val, index, self) => self.indexOf(val) === index)
                .sort()
                .map((make) => (
                  <option key={make} value={make}>
                    {make}
                  </option>
                ))}
            </select>
            <input
              value={newGrinder.name}
              name="name"
              onChange={handleNewGrinderChange}
              placeholder="Name"
            />
            <input
              value={newGrinder.name}
              name="url"
              onChange={handleNewGrinderChange}
              placeholder="Link to product page"
            />
            <button
              type="button"
              onClick={addNewGrinder}
              className="app-form-submit"
              disabled={!isCompleteGrinder(newGrinder)}
            >
              Add Grinder
            </button>
          </>
        );
      })()}
    </div>
  );
};

export default NewGrinder;
