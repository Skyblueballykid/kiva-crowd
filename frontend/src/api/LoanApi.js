export default {
  getLoans() {
    return fetch('/api/loan/')
      .then((res) => res.json())
      .then((data) => {
        return data.results;
      })
      .catch(console.log);
  }
};
