export const customStyles = {
  content: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width:'600px',
    height:'600px',
    borderRadius:'10px'
  },
};

export const adaptLabelsForDoughnutChart = (data) => {
  const categories = data.map((o) => o.category);
  const filtered = data.filter(
    ({ category }, index) => !categories.includes(category, index + 1)
  );
  return filtered;
};

export const adaptDataForDoughnutChart = (data) => {
  let result = data
    .map((data) => ({ ...data, amount: Number(data.amount) }))
    .reduce((acc, curr) => {
      let item = acc.find((item) => item.category === curr.category);

      if (item) {
        item.amount += Number(curr.amount);
      } else {
        acc.push(curr);
      }

      return acc;
    }, []);
  return result;
};
