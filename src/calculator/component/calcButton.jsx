export const CalcButton = ({ button, props }) => {
  const { id, value, title } = button;
  return (
    <div key={id} className={`calc_Button ${title}`} {...props}>
      <div>{value}</div>
    </div>
  );
};
