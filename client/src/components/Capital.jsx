import { useState, useEffect } from 'react'
import { useParams } from "react-router-dom"

export default function Capital() {

    const { id } = useParams();

    return (
        <div>Capital</div>
    )
}
