import React from 'react';
import { useQuery } from 'react-query';
import { QuerySetting } from '../types';

const SettingsTable: React.FC = () => {
  const { data: settings = [] } = useQuery<QuerySetting[]>('settings', () =>
    fetch('http://localhost:3001/settings').then((res) => res.json())
  );
  return (
    <table className="my-grinders-table">
      <thead>
        <tr>
          <th>Grinder</th>
          <th>Bean</th>
          <th>Dose</th>
          <th>Grind Size</th>
          <th>Basket</th>
          <th>Comment</th>
        </tr>
      </thead>
      <tbody>
        {settings.map((setting) => (
          <tr
            key={`setting-table-${setting.id}`}
          >
            <td>
              {setting.grinder.makeName} <strong>{setting.grinder.name}</strong>
            </td>
            <td>
              {setting.bean.roasterName} <strong>{setting.bean.name}</strong>
            </td>
            <td>{setting.dose}g</td>
            <td>{setting.grindSize}</td>
            <td>{setting.basket}</td>
            <td>{setting.comment}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SettingsTable;
