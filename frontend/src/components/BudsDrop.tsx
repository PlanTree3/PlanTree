import {useDrop} from "react-dnd";

const BudsDrop = ({ day, children }) => {
  const [, drop] = useDrop(() => ({
    accept: 'BUD',
    drop: () => ({ dayOfWeek: day }),
  }));

  return (
    <div ref={drop}>
      {day} {children}
    </div>
  );
};

export default BudsDrop