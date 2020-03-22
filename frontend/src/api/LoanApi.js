export default {
    getLoans() {
        return fetch('http://localhost:8000/api/loan/')
            .then(res => res.json())
            .then(
                (data) => {
                    return data.results;
                }
            )
            .catch(console.log);
    }
}
