import React from 'react'
import propTypes from 'prop-types';
import css from './Filter.module.css'

export function Filter({handleChange, value}) {
  return (
    <div>
      <input className={css.filter} type="text" value={value} onChange={handleChange} name= "filter" />
    </div>
  )
}


Filter.propTypes = {
    value: propTypes.string.isRequired,
    handleChange: propTypes.func.isRequired,
  };