import React, { SelectHTMLAttributes } from 'react'
import { v4 as uuid } from 'uuid'

import './styles.css'

export interface SelectOption {
  value: string | number
  label: string
}

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  name: string
  label: string
  options: SelectOption[]
}

const Select: React.FC<SelectProps> = ({ name, label, options, ...rest }) => {
  return (
    <div className="select-block">
      <label htmlFor={name}>{label}</label>
      <select id={name} value="" {...rest}>
        <option value="" disabled hidden>
          Selecione uma opção
        </option>
        {options.map(({ value, label }) => (
          <option key={uuid()} value={value}>
            {label}
          </option>
        ))}
      </select>
    </div>
  )
}

export default Select
