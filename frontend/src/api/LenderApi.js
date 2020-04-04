export default {
    getLenders() {
        return fetch('http://localhost:8000/api/lender/')
            .then(res => res.json())
            .then(
                (data) => {
                    return data.results;
                }
            )
            .catch(console.log);
    }
}