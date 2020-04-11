export default {
    getAllLoans() {
        return fetch('http://localhost:8000/api/statistics/stats_1')
            .then(res => res.json())
            .then(
                (data) => {
                    return data.results;
                }
            )
            .catch(console.log);
    },
    getAllLenders() {
        return fetch('http://localhost:8000/api/statistics/stats_2')
            .then(res => res.json())
            .then(
                (data) => {
                    return data.results;
                }
            )
            .catch(console.log);
    }
}
