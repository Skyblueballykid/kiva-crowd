export default {
    getAllLoans() {
        return fetch('http://localhost:8000/api/statistics/loanstats')
            .then(res => res.json())
            .then(
                (data) => {
                    return data.results;
                }
            )
            .catch(console.log);
    },
    getAllLenders() {
        return fetch('http://localhost:8000/api/statistics/lenderstats')
            .then(res => res.json())
            .then(
                (data) => {
                    return data.results;
                }
            )
            .catch(console.log);
    }
}
