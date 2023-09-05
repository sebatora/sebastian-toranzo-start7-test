import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

function Quiz( { categories } ) {

  const {category} = useParams()

  const { id } = categories.find(element => element.title === category)

  useEffect(() => {
    console.log(id);
  }, []);

  return (
    <div>
      {category}
    </div>
  )
}

export default Quiz