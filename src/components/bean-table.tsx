import React from 'react';
import { Bean } from '../app';

type Props = {
  beans: Bean[];
};

const BeanTable: React.FC<Props> = ({ beans }) => (
  <table className="my-grinders-table">
    <thead>
      <tr>
        <th>Brand</th>
        <th>Name</th>
        <th>Dose</th>
        <th>Grind Size</th>
        <th>Basket</th>
        <th>Comment</th>
      </tr>
    </thead>
    <tbody>
      {beans.map((bean) => (
        <tr key={bean.brand + bean.name + bean.dose + bean.grindSize}>
          <td>{bean.brand}</td>
          <td>{bean.name}</td>
          <td>{bean.dose}</td>
          <td>{bean.grindSize}</td>
          <td>{bean.basket}</td>
          <td>{bean.comment}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default BeanTable;
