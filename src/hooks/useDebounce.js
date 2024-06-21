import { useEffect, useState } from "react"

export const useDebouce = (value, delay = 5000) => {
    const [debouce, setDebounce] = useState('')

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebounce(value);
            return () => clearTimeout(timer)
        }, delay)
    }, [value, delay])
    return debouce;
}