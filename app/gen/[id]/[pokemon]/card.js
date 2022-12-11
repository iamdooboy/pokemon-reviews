'use client'

import React, { useState } from 'react'

const Card = ({ data }) => {
    const { id, name, types, image, mega, variants, forms } = data

    const [img, setImg] = useState(image)
    console.log(img)
    return (
        <>
            <button onClick={() => setImg('https://raw.githubusercontent.com/HybridShivam/Pokemon/master/assets/images/006-Gmax.png')}>forms</button>
            <div>{name}</div>
            <div>{id}</div>
            {types.map(type => <div key={type}>{type}</div>)}
            <img src={img} />
        </>
    )
}

export default Card