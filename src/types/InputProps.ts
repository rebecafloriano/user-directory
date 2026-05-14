
export interface InputProps {
    label: string,
    placeholder?: string,
    value: string,
    type?: string,
    onChange: (val: string) => void
    inputRef?: React.RefObject<HTMLInputElement | null> 
    hasError?: boolean                        
}