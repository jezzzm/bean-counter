import React from 'react';
import { useMutation, useQueryClient } from 'react-query';
import './app.css';
import SettingsTable from './components/settings-table';
import NewBean from './components/new-bean';
import NewGrinder from './components/new-grinder';
import { MutateBean, MutateModel, MutateSetting, QueryBean, QueryModel, QuerySetting } from './types';
import NewSetting from './components/new-setting';

function App() {
  const queryClient = useQueryClient();

  const mutateGrinder = useMutation<QueryModel, unknown, MutateModel>(
    (grinder) =>
      fetch('http://localhost:3001/grinder', {
        method: 'post',
        body: JSON.stringify(grinder),
      }).then((res) => res.json()),
    {
      mutationKey: 'addGrinder',
      onSuccess: () => {
        queryClient.invalidateQueries('grinders');
      },
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
        queryClient.invalidateQueries('beans');
        queryClient.invalidateQueries('roasters');
      },
    }
  );
  const mutateSetting = useMutation<QuerySetting, unknown, MutateSetting>(
    (setting) =>
      fetch('http://localhost:3001/setting', {
        method: 'post',
        body: JSON.stringify(setting),
      }).then((res) => res.json()),
    {
      mutationKey: 'addBean',
      onSuccess: () => {
        queryClient.invalidateQueries('settings');
        queryClient.invalidateQueries('beans');
        queryClient.invalidateQueries('grinders');
        queryClient.invalidateQueries('roasters');
      },
    }
  );

  return (
    <div className="app">
      <div className="app-wrapper">
        <header className="app-header">
          <div className="app-forms-container">
            <NewGrinder onSubmit={mutateGrinder.mutate} />
            <NewBean onSubmit={mutateBean.mutate} />
            <NewSetting onSubmit={mutateSetting.mutate} />
          </div>
        </header>
        <div className="tables-container">
          <SettingsTable />
        </div>
      </div>
    </div>
  );
}

export default App;
