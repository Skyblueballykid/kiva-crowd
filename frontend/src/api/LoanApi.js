const { REACT_APP_API } = process.env;

export default {
  getLoans() {
    return fetch(`${REACT_APP_API}/api/loan/`)
      .then((res) => res.json())
      .then((data) => {
        return data.results;
      })
      .catch(console.log);
  }
};
