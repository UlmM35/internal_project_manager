interface Props {
    message: string;
    type: 'success' | 'error';
}

const Notification = ({ message, type }: Props) => {

    if (!message) {
        return null
    }

    return (
        <div style={{ color: type === 'error' ? 'red' : 'green', fontSize: '13px'}}>
            {message}
        </div>
    )
}

export default Notification;