const citiesController = (dbModel) => {
  return {
    get: get(dbModel)
  };
};

const get = (dbModel) => (req, res) => {
  dbModel.find((e, results) => {
    const data = results.reduce((acc, occurrence) => {
      const cityData = acc.find((c) => (c.name === occurrence.city));

      if (cityData) {
        const newArray = acc.splice(acc.indexOf(cityData), 1);
        return [
          ...acc,
          {
            ...cityData,
            numberOfOccurrences: cityData.numberOfOccurrences + 1,
            numberOfReviews: (occurrence.status === 'REVIEW') ? cityData.numberOfReviews + 1 : cityData.numberOfReviews
          }
        ];
      } else {
        return [
          ...acc,
          {
            name: occurrence.city,
            numberOfOccurrences: 1,
            numberOfReviews: (occurrence.status === 'REVIEW') ? 1 : 0
          }
        ];
      }
    }, []);

    return res.json(data);
  });
};

export default citiesController;
