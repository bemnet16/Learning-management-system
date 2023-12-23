import { useEffect, useState } from "react";

export function useDebounce<T>(value: T, delay?: number) : T {
    const [debounceValue, setDebunceValue] = useState<T>(value)

    useEffect(()=>{
        const timer = setTimeout(()=>{
            setDebunceValue(value)
        },delay || 500)

        return () => {
            clearTimeout(timer)
        }
    },[value,delay])

    return debounceValue
    
}