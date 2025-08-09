interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
}

const Button = ({ children, className, ...rest}: ButtonProps) => {
    return (
        <button
            {...rest}
            className={className}>
            {children}
        </button>
    )
}
export default Button;