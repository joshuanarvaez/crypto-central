import React from 'react'
import { Spin } from 'antd';

// render this component whenever we try to fetch data so we can avoid error and user will know we are fetching data
const Loader = () => {
  return (
    <div className="loader">
        <Spin />
    </div>
  )
}

export default Loader;