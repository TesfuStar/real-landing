import React from 'react'
import {Field} from 'formik'
const Textarea = (props) => {
    const {label,name,...rest} = props
  return (
    <div >
        <Field   as={'textarea'} name={name} {...rest} 
        className="rounded-md focus:outline-blue-500 pl-4 h-10 w-full border-2"
        />
    </div>
  )
}

export default Textarea