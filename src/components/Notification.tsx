import { useEffect } from 'react';
import { INotification } from '../interfaces/notification';
interface INotiifProps {
  objNotification: INotification
  setNotification: React.Dispatch<React.SetStateAction<INotification>>
}

const Notification = ({objNotification, setNotification}: INotiifProps) => {
  const textAndBorderColor = objNotification.type === "error" ? 'red': 'green';
  const styleNotif: object = {
    color: textAndBorderColor,
    background: 'lightgrey',
    fontStyle: 'italic',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  };

  useEffect(() => {
    if (objNotification.type !== null) {
      setTimeout(() => {
        setNotification({
          type: null,
          message: ""
        });
      }, 5000);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [objNotification])

  return ( !objNotification.message? <></>:
    <div className="notification" style={styleNotif}>
      {objNotification.message}
    </div>
  )
}

export default Notification;