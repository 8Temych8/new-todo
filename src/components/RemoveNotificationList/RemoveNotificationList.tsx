import { useEffect, useState } from "react";
import RemoveNotification from "./components/RemoveNotification/RemoveNotification";
import styles from "./RemoveNotificationList.module.scss";

interface RemoveNotificationListProps {
  removedList: string[];
  undoRemove: (id: string) => void;
  setRemovedId: React.Dispatch<React.SetStateAction<string[]>>;
}

const RemoveNotificationList = ({
  removedList,
  undoRemove,
  setRemovedId,
}: RemoveNotificationListProps) => {
  const [notificationVisibility, setNotificationVisibility] = useState<{
    [key: string]: boolean;
  }>({});
  const [activeNotifications, setActiveNotifications] = useState<string[]>([]);

  useEffect(() => {
    setActiveNotifications((prev) => {
      const newNotifications = removedList.filter((id) => !prev.includes(id));
      return [...prev, ...newNotifications];
    });

    const newVisibility = removedList.reduce((acc, id) => {
      acc[id] = true;
      return acc;
    }, {} as { [key: string]: boolean });

    setNotificationVisibility(newVisibility);
  }, [removedList]);

  const handleUndo = (id: string) => {
    undoRemove(id);
    setNotificationVisibility((prev) => {
      const newState = { ...prev };
      delete newState[id];
      return newState;
    });
    setActiveNotifications((prev) => prev.filter((taskId) => taskId !== id));
  };

  const handleTimeout = (id: string) => {
    setNotificationVisibility((prev) => {
      const newState = { ...prev };
      delete newState[id];
      return newState;
    });

    setActiveNotifications((prev) => prev.filter((taskId) => taskId !== id));

    setTimeout(() => {
      setRemovedId((prev) => prev.filter((taskId) => taskId !== id));
    }, 3000);
  };

  return (
    <div className={styles.container}>
      {activeNotifications.map((id) =>
        notificationVisibility[id] ? (
          <RemoveNotification
            key={id}
            isVisible={true}
            setIsVisible={() => handleTimeout(id)}
            undoRemove={() => handleUndo(id)}
          />
        ) : null
      )}
    </div>
  );
};

export default RemoveNotificationList;
