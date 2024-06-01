type Props = {
    text: String,
    handleToggle: () => void
}

function Button({text, handleToggle} : Props) {
    return (
        <button onClick={() => handleToggle()}>{text}</button>
    )
}

export default Button;