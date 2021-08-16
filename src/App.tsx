import React from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import './app.css';
import SettingsTable from './components/settings-table';
import NewBean from './components/new-bean';
import NewGrinder from './components/new-grinder';
import {
  MutateBean,
  MutateModel,
  QueryBean,
  QueryModel,
  QuerySetting,
} from './types';

function App() {
  const queryClient = useQueryClient();

  const { data: settings = [] } = useQuery<QuerySetting[]>('settings', () =>
    fetch('http://localhost:3001/settings').then((res) => res.json())
  );

  const mutateGrinder = useMutation<QueryModel, unknown, MutateModel>(
    (grinder) =>
      fetch('http://localhost:3001/grinder', {
        method: 'post',
        body: JSON.stringify(grinder),
      }).then((res) => res.json()),
    {
      mutationKey: 'addGrinder',
      onSuccess: () => {
        queryClient.invalidateQueries('grinders')
      }
    }
  );

  const mutateBean = useMutation<QueryBean, unknown, MutateBean>(
    (bean) =>
      fetch('http://localhost:3001/bean', {
        method: 'post',
        body: JSON.stringify(bean),
      }).then((res) => res.json()),
    {
      mutationKey: 'addBean',
            onSuccess: () => {
        queryClient.invalidateQueries('beans')
        queryClient.invalidateQueries('roasters')
      }
    }
  );

  return (
    <div className="app">
      <div className="app-wrapper">
        <header className="app-header">
          <div className="app-forms-container">
            <NewGrinder onSubmit={mutateGrinder.mutate} />
            <NewBean onSubmit={mutateBean.mutate} />
          </div>
        </header>
        <div className="tables-container">
          <SettingsTable settings={settings} />
        </div>
      </div>
    </div>
  );
}

export default App;
