import React from 'react';
import { Setting } from '../app';

type Props = {
  settings: Setting[];
};

const SettingsTable: React.FC<Props> = ({ settings }) => (
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
        <tr key={setting.createdAt + setting.bean.name + setting.dose + setting.grindSize}>
          <td>{setting.grinder.makeName} <strong>{setting.grinder.name}</strong></td>
          <td>{setting.bean.roasterName} <strong>{setting.bean.name}</strong></td>
          <td>{setting.dose}g</td>
          <td>{setting.grindSize}</td>
          <td>{setting.basket}</td>
          <td>{setting.comment}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default SettingsTable;
