import React from 'react';
import style from '../Css/Tabular.module.css'

// Tabular component
const Tabular = ({ data }) => {
  return (
    <div className={style.tablecontainer}>
      {/* Content for screens below 768px width */}
      <table className={style.table1}>
        <tbody>
          {data?.body.data.results.map((item, index) => (
            <div key={index}>
              <tr>
                <th>Image</th>
                <td>
                  <img src={item.image} alt="Item" className={style.table_image} />
                </td>
              </tr>
              <tr>
                <th>Title</th>
                <td className={style.table_title}>{item.name}</td>
              </tr>
              <tr>
                <th>Description</th>
                <td className={style.table_description}>{item.description}</td>
              </tr>
              <tr>
                <th>Modified at</th>
                <td className={style.lastmodified}>
                  {new Date(item.dateLastEdited).toLocaleDateString() + " " + new Date(item.dateLastEdited).toLocaleTimeString()}
                </td>
              </tr>
            </div>
          ))}
        </tbody>
      </table>

      {/* Content for screens above or equal to 768px width */}
      <table className={style.table2}>
        <thead>
          <tr>
            <th>Image</th>
            <th>Title</th>
            <th>Description</th>
            <th>Modified at</th>
          </tr>
        </thead>
        <tbody>
          {data?.body.data.results.map((item, index) => (
            <tr key={index}>
              <td>
                <img src={item.image} alt="Item" className={style.table_image} />
              </td>
              <td className={style.table_title}>{item.name}</td>
              <td className={style.table_description}>{item.description}</td>
              <td className={style.lastmodified}>
                {new Date(item.dateLastEdited).toLocaleDateString() + " " + new Date(item.dateLastEdited).toLocaleTimeString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Tabular;
